import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

Vue.use(VueAxios, axios)
Vue.component('LMap', LMap)
Vue.component('LTileLayer', LTileLayer)
Vue.component('LMarker', LMarker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
