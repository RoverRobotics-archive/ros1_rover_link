import os
import wifi
import time

from wifi import Cell, Scheme


class WifiManager:
    _scan_timeout = 10
    _scan_wait_interval = 30 # time until next scan is avaiable
    last_scan = None

    def __init__(self):
        print("{}: initializing and scanning for networks".format(self.__class__.__name__))
        self.rescan()

    def search(self):
        ssids = os.popen("nmcli dev wifi").read() # get ssids and pass to python
        ssids = ssids.split("\n")
        formatted_ssids = []
        for ssid in ssids[1:]:
            format_ssid = ssid.split()
            formatted_ssids.append(format_ssid)
        return formatted_ssids

    """
       Rescans for wireless networks.       

        Returns:
            Bool if new networks have been found or not

        """
    def rescan(self):
        # nmcli dev wifi rescan
        start = time.time()
        if WifiManager.last_scan and (self._get_last_scan_time() - start) < WifiManager._scan_wait_interval:
            raise RuntimeError('Scanning not allowed immediately following previous scan.')

        current_len = len(self.search()) # get current length of search results
        os.popen("nmcli dev wifi rescan") # init scan
        while True: # loop and pause checking if new ssids have been found or timeout exp has elapsed
            time.sleep(1) # sleep 1 second to slow loop down
            new_len = len(self.search())
            if new_len > current_len:
                self._set_last_scan_time()
                return True
            elif time.time() - start >= WifiManager._scan_timeout:
                self._set_last_scan_time()
                return False

    @classmethod
    def _set_last_scan_time(cls):
        cls.last_scan = time.time()

    @classmethod
    def _get_last_scan_time(cls):
        return cls.last_scan

    def connect(self, ssid, password=None):
        cell = self.findFromSearchList(ssid)

        if cell:
            savedcell = self.findFromSavedList(cell.ssid)

            # Already Saved from Setting
            if savedcell:
                savedcell.activate()
                return cell

            # First time to conenct
            else:
                if cell.encrypted:
                    if password:
                        scheme = self.add(cell, password)

                        try:
                            scheme.activate()

                        # Wrong Password
                        except wifi.exceptions.ConnectionError:
                            self.delete(ssid)
                            return False

                        return cell
                    else:
                        return False
                else:
                    scheme = self.add(cell)

                    try:
                        scheme.activate()
                    except wifi.exceptions.ConnectionError:
                        self.delete(ssid)
                        return False

                    return cell

        return False


    def add(self, cell, password=None):
        if not cell:
            return False

        scheme = wifi.Scheme.for_cell('wlan0', cell.ssid, cell, password)
        scheme.save()
        return scheme


    def delete(self, ssid):
        if not ssid:
            return False

        cell = self.findFromSavedList(ssid)

        if cell:
            cell.delete()
            return True

        return False












