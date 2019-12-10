import os
import time
import re

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
            format_ssid = re.split(r'\s{2,}', ssid)
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
        if WifiManager.last_scan and (start - self._get_last_scan_time()) < WifiManager._scan_wait_interval:
            raise RuntimeError('Scanning not allowed immediately please wait 30 seconds.')

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
        connection = os.popen("nmcli device wifi connect '{}' password {}".format(ssid, password)).read()
        if "Error" in connection:
            raise ValueError('Error Connecting to network: {}'.format(connection))





    def add(self, cell, password=None):
        if not cell:
            return False

        scheme = wifi.Scheme.for_cell('wlan0', cell.ssid, cell, password)
        scheme.save()
        return scheme













