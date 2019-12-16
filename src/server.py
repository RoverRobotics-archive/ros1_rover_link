#!/usr/bin/env python
from flask import Flask
from routes.wifi import wifi
from routes.assets import assets


app = Flask(__name__)
app.register_blueprint(wifi)
app.register_blueprint(assets)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=False)
