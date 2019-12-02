#!/usr/bin/env python
import os
import signal
import sys
from flask import Flask, send_file, request, send_from_directory, jsonify

from wifi_config import WifiManager


app = Flask(__name__)
wifi_mgr = WifiManager()



@app.route("/")
def getPageHTML():
    return send_file("index.html")


@app.route("/fonts/<file>")
def fonts(file):
    return send_file(os.path.join("fonts", file))


@app.route("/img/<file>")
def img(file):
    return send_file(os.path.join("img", file))

@app.route("/css/<file>")
def css(file):
    return send_file(os.path.join("css", file))

@app.route("/js/<file>")
def js(file):
    return send_file(os.path.join("js", file))

@app.route('/wifi-search')
def get_wifi_connections():
    wifi = wifi_mgr.search()
    return jsonify(wifi)

@app.route('/wifi-rescan', methods=['GET'])
def rescan_for_networks():
    try:
        wifi_mgr.rescan()
    except RuntimeError as e:
        return jsonify(str(e))
    wifi = wifi_mgr.search()
    return jsonify(wifi)







def signal_handler(signal, frame):
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    app.run(host='0.0.0.0', port=80, debug=False)
