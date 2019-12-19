#!/usr/bin/env python
from flask import Flask, session
from routes.wifi import wifi
from routes.assets import assets
from routes.users import users
from flask_socketio import SocketIO, emit



app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
blueprints = [wifi, assets, users]

for print_ in blueprints:
    app.register_blueprint(print_)

TOTAL_CLIENTS = 0

@socketio.on('connect')
def connect():
    global TOTAL_CLIENTS
    TOTAL_CLIENTS += 1
    print('client connected')
    socketio.emit('total-clients', TOTAL_CLIENTS);

@socketio.on('disconnect')
def disconnect():
    global TOTAL_CLIENTS
    TOTAL_CLIENTS -=1
    print('Client disconnected')
    socketio.emit('total-clients', TOTAL_CLIENTS);



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=False)
