 import io from 'socket.io-client';



class Sockets {
    constructor(store) {
        this.socket = io('http://localhost');
        this.store = store
        this.listen()
    }
    listen() {
            this.socket.on('connect', () => {
                this.socket.on('disconnect', () => {
                    console.log('user disconnected');
            });
            this.socket.on('total-clients', (data) => {
                console.log(data)
                this.store.dispatch('showNotification', {
                    message: "new client connected: " + data  + " total clients disconnected",
                    type: ""
                })
            })
        });
    }
}

export default Sockets;