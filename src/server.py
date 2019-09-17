#!/usr/bin/env python

from flask import Flask, send_file, request, send_from_directory, jsonify
import os
import signal
import sys

app = Flask(__name__)


@app.route("/")
def getPageHTML():
    return send_file("index.html")


@app.route("/css/<file:file>")
def css(file):
    return send_file(os.path.join("assets", "css", file))


@app.route("/js/<file:file>")
def js(file):
    return send_file(os.path.join("assets", "js", file))


@app.route("/fonts/<file:file>")
def fonts(file):
    return send_file(os.path.join("assets", "fonts", file))


@app.route("/img/<file:file>")
def fonts(file):
    return send_file(os.path.join("assets", "img", file))


def signal_handler(signal, frame):
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    app.run(host='0.0.0.0', port=5000, debug=False)
