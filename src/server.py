#!/usr/bin/env python
from flask import Flask, session
from flask_socketio import SocketIO, emit
from routes.wifi import wifi
from routes.assets import assets
from routes.users import users




app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

blueprints = [wifi, users, assets]

for print_ in blueprints:
    app.register_blueprint(print_)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
