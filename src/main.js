import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import firebase from 'firebase'
import './components/config/firebaseInit'
import Vuetify from 'vuetify'
import _ from 'lodash'

import Toasted from 'vue-toasted'
//import VueFire from 'vuefire'
import VueFirestore from 'vue-firestore';

import 'vuetify/dist/vuetify.min.css'

import VueRamda from 'vue-ramda'

import 'vis/dist/vis.css';


Vue.use(Vuetify)
Vue.use(Toasted)
//Vue.use(VueFire)
Vue.use(VueFirestore)
Vue.use(VueRamda)

Vue.config.productionTip = false

Vue.toasted.register('warning', (payload) => { return payload.message}, {
    //type : 'error',
    icon : 'warning',
    theme: 'primary',
    position: 'top-center',
    duration : 5000,
    action : {
          icon : 'close',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
    }
})

Vue.filter('upperCase', function(value) {
    value = value.toString()
    return value.toUpperCase()
})

// Vue.filter('0dp', function(value) {
//     return value.toFixed(0)
// });
// Vue.filter('1dp', function(value) {
//     return value.toFixed(1)
// });
// Vue.filter('2dp', function(value) {
//     return value.toFixed(2)
// });
// Vue.filter('3dp', function(value) {
//     return value.toFixed(3)
// });
// Vue.filter('4dp', function(value) {
//     return value.toFixed(4)
// })

let app
firebase.auth().onAuthStateChanged(user =>{
    if(!app){
        app = new Vue({
            el: '#app',
            store,
            router,
            render: h => h(App)
        })
    }
})
/* eslint-disable no-new */

