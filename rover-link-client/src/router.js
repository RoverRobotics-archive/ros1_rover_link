import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import DeveloperSettings from "./views/DeveloperSettings";
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/app/rover-link',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'control-panel',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Settings.vue')
    },
      {
      path: '/settings/wifi',
      name: 'wifi',
      component: () => import(/* webpackChunkName: "about" */ './views/WifiManger.vue')
    },
       {
      path: '/settings/developer',
      name: 'developer',
      component: () => import(/* webpackChunkName: "about" */ './views/DeveloperSettings.vue')
    }
  ]
})
