import Janus from "./janus";

class RoverJanus {
    constructor(connectURL, videoEL) {
        this.janusConnection = null;
        this.pluginHandle = null;
        this.connectURL = connectURL
        this.videoEL = videoEL
    }

    doConnect(vuexcallback) {
         Janus.init({
            debug: true,
            dependencies: Janus.useDefaultDependencies(),
            callback: () =>  {
                this.onJanusInit(vuexcallback);
            }
        });
    }

    onJanusInit(vuexcallback) {
        let server = null;
        if (window.location.protocol === 'http:') {
            server = "http://" + this.connectURL + ":8088/janus";
        }
        else {
            server = "https://" + this.connectURL + ":8089/janus";
        }

        this.janusConnection = new Janus({
            server: server,
            success:  () => {
                this.onJanusConnect(this.janusConnection);
                vuexcallback('showNotification', {
                    message: "Janus connected successfully",
                    type: ""
                })
            },
            error:  (error) => {
                vuexcallback('showNotification', {
                    message: "JANUS SERVER ERROR",
                    type: 'danger'
                })
            },
            destroyed: function () {

            }
        });
    }

    onJanusConnect() {
        let opaqueId = "streamingtest-" + Janus.randomString(12);
        this.janusConnection.attach({
            plugin: "janus.plugin.streaming",
            opaqueId: opaqueId,
            success: (plugin) => {
                this.pluginHandle = plugin;
                this.onPluginAttached();
            },
            error: (error) => {
                console.log("Error attaching plugin: " + error);
            },
            onremotestream: (stream) => {
                this.onRemoteStreamStart(stream);
            },
            onmessage: (msg, jsep) => {
                this.onRemoteMessage(msg, jsep);
            }
        });
    }

    onRemoteStreamStart(stream) {
        Janus.attachMediaStream(this.videoEL, stream);
    }

    onPluginAttached() {
        // Watney HD stream is id 10
        const body = { "request": "watch", id: 10 };
        this.pluginHandle.send({ "message": body });
    }

    onRemoteMessage(msg, jsep) {
        const result = msg["result"];
        if (result && result["status"] && result["status"] === 'stopped') {
            this.stopStream();
        }

        const error = msg["error"];
        if (error) {
            console.log("Remote error: " + error);
            this.stopStream();
        }

        if (jsep) {
            this.pluginHandle.createAnswer({
                jsep: jsep,
                media: {
                    audioSend: false,
                    videoSend: false,
                    data: true,
                },
                success: (jsep) => {
                    const body = { "request": "start" };
                    this.pluginHandle.send({ "message": body, "jsep": jsep });
                },
                error: (error) => {
                    console.log("Remote offer error: " + error);
                }
            });
        }
    }

    stopStream()  {
        if (this.pluginHandle) {
            const body = { "request": "stop" };
            this.pluginHandle.send({ "message": body });
            this.pluginHandle.hangup();
        }
    }

}

export default RoverJanus;

