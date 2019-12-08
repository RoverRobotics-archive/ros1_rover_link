#!/usr/bin/env python
import os
import signal
import sys
import json
from flask import Flask, send_file, request, send_from_directory, jsonify

from wifi_config import WifiManager


app = Flask(__name__)
wifi_mgr = WifiManager()


@app.route('/')
def send_vue_app_index():
    return send_file(os.path.join('app', 'index.html'))

@app.route('/<path:path>')
def send_vue_app(path):
    return send_file(os.path.join('app', 'index.html'))


@app.route("/fonts/<file>")
def fonts(file):
    return send_file(os.path.join("app", "fonts", file))


@app.route("/img/<file>")
def img(file):
    return send_file(os.path.join("app", "img", file))

@app.route("/css/<file>")
def css(file):
    return send_file(os.path.join("app", "css", file))

@app.route("/js/<file>")
def js(file):
    return send_file(os.path.join("app", "js", file))

@app.route('/wifi-search')
def get_wifi_connections():
    wifi = wifi_mgr.search()
    return jsonify(wifi)

@app.route('/wifi-connect', methods=['POST'])
def connect():
    args = json.loads(request.data)
    ssid = args.get('ssid')
    password = args.get('password')
    try:
        wifi_mgr.connect(ssid, password)
        ssid_list = wifi_mgr.search()
        return jsonify(ssid_list), 200
    except ValueError as e:
        return jsonify("connection failed: invalid password"), 401

@app.route('/wifi-rescan', methods=['POST'])
def rescan_for_networks():
    try:
        wifi_mgr.rescan()
    except RuntimeError as e:
        return jsonify(str(e)), 400
    wifi = wifi_mgr.search()
    return jsonify(wifi)

@app.route('/wifi-disconnect', methods=['GET'])
def disconnect_wifi():
    disconnect  = os.popen('nmcli connection delete id digilabs_unifi').read()
    print(disconnect)
    return "Disconnected", 200
# work@digilabs







def signal_handler(signal, frame):
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    app.run(host='0.0.0.0', port=80, debug=False)
