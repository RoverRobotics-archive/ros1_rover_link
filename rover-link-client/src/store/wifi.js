import axios from "axios";

const state = {
    ssids: [],
    connecting: false
};


const getters = {
    ssidList: (state) => state.ssids,
    wifiConnecting: (state) => state.connecting,
    wifiScanning: (state) => state.scanning
}

const actions = {
    getSSIDS({commit, state, dispatch}) {
        let data = axios.get(`${window.location.protocol}//${window.location.host}/wifi-search`).then((res) => {
            commit('ssids', res.data)
        }).catch((err) => {
            dispatch('showNotification', {
                message: 'Failed to retrieve networks.',
                type: 'danger'
            })
        });
    },
    rescanForSSIDS({commit, state, dispatch}) {
        dispatch('showNotification', {
            message: 'Scanning for networks... please wait.',
            type: ''
        })
        commit('scanning', true)
        axios.post(`${window.location.protocol}//${window.location.host}/wifi-rescan`).then((res) => {
            commit('scanning', false)
            commit('ssids', res.data)
            let message = {
                message: res.data.length + " connections found",
                type: ''
            }
            dispatch('showNotification', message)
        }).catch((err) => {
            console.log(err)
            dispatch('showNotification', {
                message: err.response.data,
                type: "warning"
            })
        })
        commit('connecting', false)
    },
    connectWifi({commit, state, dispatch}, data) {
        dispatch('showNotification', {
            message: 'Connecting to network... please wait.',
            type: ''
        });
        axios.post(`${window.location.protocol}//${window.location.host}/wifi-connect`, data).then((res) => {
            commit('connecting', false)
            commit('ssids', res.data)
            dispatch('showNotification', {
                message: "Connection successful",
                type: ""
            })
        }).catch((err) => {
            dispatch('showNotification', {
                message: "connection failed: re-connecting to previous network",
                type: "danger"
            })
        })
    }
}


const mutations = {
    ssids: function(state,ssids) {
        return state.ssids = ssids
    },
    connecting: function(state, bool) {
        return state.connecting = bool
    },
    scanning: function(state, bool) {
        return state.scanning = bool
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}