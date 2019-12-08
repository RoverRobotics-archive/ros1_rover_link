import Vue from 'vue'
import Vuex from 'vuex'
import ros from "./ros";
import notifications from "./notifications";
import teleop from "./teleop";
import wifi from "./wifi";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ros,
    teleop,
    notifications,
    wifi
  }
});
