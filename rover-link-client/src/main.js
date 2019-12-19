import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Sockets from "./modules/Sockets"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWifi, faWrench, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faWifi,faWrench, faGamepad)

new Sockets(store);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');





