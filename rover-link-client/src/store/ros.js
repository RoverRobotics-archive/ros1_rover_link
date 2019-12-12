import * as ROSLIB from "roslib"
import RoverControl from "../modules/RoverControl"

const state = {
    rosURL: JSON.parse(window.localStorage.getItem('rosURL')) || `ws://${window.location.hostname}:9090`,
    batterySOC: null,
    batteryPercent: null,
    ROS: null,
    control: null,
    lastReceivedTime: null,
    linearSpeed: 25,
    angularSpeed: 25,
    slowRateData: {
        reg_robot_rel_soc_a: 0 // for init state to avoid errors
    }
};

const getters = {
    rosURL: (state) => state.rosURL,
    batterySOC: (state) => state.batterySOC,
    linearSpeed: (state) => state.linearSpeed,
    angularSpeed: (state) => state.angularSpeed,
    slowRateData: (state) => (state.slowRateData)
}

const actions = {
        async setROSURL({commit, dispatch}, url) {
        await window.localStorage.setItem('rosURL', JSON.stringify(url));
        commit('rosURL', url)
        window.location.reload();
    },

    async getROSURL({commit}) {
       const url = await JSON.parse(window.localStorage.getItem('rosURL')) || `ws://${window.location.hostname}:9090`;
       console.log(url)
        commit('rosURL', url)
    },
    initROS({commit, state, dispatch}) {
            let ROS;
            console.log(state.rosURL)
            dispatch("getROSURL")
            const promise = new Promise((resolve, reject) => {
                 ROS = new ROSLIB.Ros({
                    url : state.rosURL
                });
                setTimeout(() => {
                   resolve();
                },3000)

            });
            promise.then(() => {
                if (!ROS.isConnected) {
                    if (window.location.pathname == "/app/rover-link") { // stop ros from trying to connect when not in control area
                          dispatch('showNotification', {
                            message: "ROS Connection Error",
                            type: "danger"
                        });
                        dispatch("initROS")
                    } else {
                        return
                    }

                } else {
                     commit("ros", ROS);
                     dispatch('subscribe'); // init all ROS subscriptions
                     dispatch("publish"); // init all ROS publish
                     dispatch('showNotification', {
                         message: "ROS Connected",
                         type: ''
                     })
                     dispatch("receivedROSData"); // test connection continually
                }
            });
    },
    receivedROSData({dispatch, commit ,state}) {

        const comCheck = setInterval(() => {
            const currentTime = Date.now();
            if (state.lastReceivedTime !== null && (currentTime - state.lastReceivedTime > 5000) ) {
                dispatch("initROS")
                clearInterval(comCheck)
            }
        }, 5000)



    },
    subscribe({commit, dispatch, state}) {
       const charging = new ROSLIB.Topic({
            ros : state.ROS,
            name : "/rr_openrover_basic/charging",
            messageType : 'std_msgs/Bool'
        });

        let slowRateData = new ROSLIB.Topic({
            ros : state.ROS,
            name : "/rr_openrover_basic/raw_slow_rate_data",
            messageType : 'rr_openrover_basic/RawRrOpenroverBasicSlowRateData'
        });

        slowRateData.subscribe((data) => {
            commit("slowRateData", data)
            commit("setLastReceivedTime", Date.now())
        });

         charging.subscribe((message) => {
           commit("SOC", message.data)
           commit("setLastReceivedTime", Date.now())
        });
    },
    publish({commit, dispatch, state}) {
        const RC = new RoverControl(state.ROS, state.linearSpeed, state.angularSpeed, dispatch);
        commit("control", RC)
    },

    updateLinearSpeed({commit, state}, speed) {
        commit("linearSpeed", parseInt(speed));
        state.control.setLinearScale = state.linearSpeed
    },
      updateAngularSpeed({commit}, speed) {
        commit("angularSpeed", parseInt(speed))
        state.control.setAngularScale = state.angularSpeed
    },

    mobileControl({commit, state}, command) {
        if (parseInt(command)) {
             state.control.currentMobileButton = parseInt(command)
        } else if(command === "stop") {
            state.control.stopRobot()
        }
    }
}


const mutations = {
    rosURL: (state, url) => (state.rosURL = url),
    SOC: (state, data) => (state.batterySOC = data),
    ros: (state,obj) => (state.ROS = obj),
    control: (state,obj) => (state.control = obj),
    linearSpeed: (state, speed) => (state.linearSpeed = speed),
    angularSpeed: (state, speed) => (state.angularSpeed = speed),
    slowRateData: (state, data) => (state.slowRateData = data),
    setLastReceivedTime: (state,currentTime) => (state.lastReceivedTime = currentTime)
}


export default {
    state,
    getters,
    actions,
    mutations
}