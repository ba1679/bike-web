import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

import LoadingOverlay from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.use(VueAxios, axios)
Vue.component('LMap', LMap)
Vue.component('LTileLayer', LTileLayer)
Vue.component('LMarker', LMarker)
Vue.component('LPopup', LPopup)
Vue.component('LIcon', LIcon)
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster)
Vue.component('loading-overlay', LoadingOverlay)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
