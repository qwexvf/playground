import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueRouter from 'vue-router'
import Playground from './Playground.vue'
import store from './store'
import * as types from './store/mutation-types'
import socketio from 'socket.io-client'

let socket = socketio('http://localhost:8010')

socket.on('MESSAGES_AND_LABELS', (data) => {
  console.log(data)
  store.dispatch('messagesAndLabels', { messages: data.messages, labels: data.labels })
})

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/', component: Playground },
    { path: '/:label', component: Playground }
  ]
})

sync(store, router)

new Vue({
  router,
  store,
  el: '#main'
})
