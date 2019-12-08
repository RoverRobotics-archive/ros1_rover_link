import RoverJanus from "../modules/rover-janus";

const state = {
    janusURL: window.localStorage.getItem('janusURL') || window.location.hostname,
    connected: false
};


const getters = {
    janusURL: (state) => state.janusURL,
    janusConnected: (state) => state.connected
}

const actions = {
    teleopConnect({commit, dispatch, state}, videoEl) {
        const RJ = new RoverJanus(state.janusURL, videoEl);
        RJ.doConnect(dispatch)
    },
    setJanusUrl({commit, dispatch}, url) {
        window.localStorage.setItem("janusURL", url)
        window.location.reload();
    },
    setConnectedState({commit}) {
        commit('connected', true)
    }
}

const mutations = {
    connected: (state, bool) => (state.connected = bool)
}


export default {
    state,
    getters,
    actions,
    mutations
}