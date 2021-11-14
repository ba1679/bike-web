import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap' // Import js file
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios) // 套件使用use

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
