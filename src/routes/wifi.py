import os
import json
from flask import Blueprint, request, jsonify
from modules.wifi_config import WifiManager

wifi_mgr = WifiManager()
wifi = Blueprint('wifi', __name__)


@wifi.route('/wifi-search')
def get_wifi_connections():
    results = wifi_mgr.search()
    return jsonify(results)


@wifi.route('/wifi-connect', methods=['POST'])
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


@wifi.route('/wifi-rescan', methods=['POST'])
def rescan_for_networks():
    try:
        wifi_mgr.rescan()
    except RuntimeError as e:
        return jsonify(str(e)), 400
    results = wifi_mgr.search()
    return jsonify(results), 200
