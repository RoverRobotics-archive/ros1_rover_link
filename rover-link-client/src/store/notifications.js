

const state = {
    show: false,
    messages: []
};

const getters = {
    notificationShow: (state) => state.show,
    notificationMessages: (state) => state.messages
}

const actions = {
      showNotification: ({commit, state}, message) => {
          commit("show", true);
          commit("messages", message)
          setTimeout(() => {
              commit("show", false);
              commit("messages")
          }, 2000)
    }
}


const mutations = {
    show: (state, value) => (state.show = value),
    messages: (state, message) =>  {
        if (message) {
            state.messages.push(message)
        } else if (message === undefined) {
            state.messages.pop()
        }

    }
}


export default {
    state,
    getters,
    actions,
    mutations
}