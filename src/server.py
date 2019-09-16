#!/usr/bin/env python
from flask import Flask, send_file, request, send_from_directory, jsonify
import signal
import sys


app = Flask(__name__)


@app.route("/")
def getPageHTML():
    return send_file("index.html")


def signal_handler(signal, frame):
    sys.exit(0)


if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    app.run(host='0.0.0.0', port=5000, debug=False)
