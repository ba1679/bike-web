import Vue from 'vue'
import Vuex from 'vuex'
import cities from '@/assets/cities.json'
import JsSHA from 'jssha'

// module
import station from './station.js'
import route from './route.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    breakPoint: null,
    isMobile: false,
    navBarShow: false,
    cities: cities,
    apiHeader: null
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    breakPoint (state) {
      return state.breakPoint
    },
    isMobile (state) {
      return state.isMobile
    },
    navBarShow (state) {
      return state.navBarShow
    }
  },
  mutations: {
    SET_IS_LOADING (state, isLoading) {
      state.isLoading = isLoading
    },
    SET_BREAKPOINT (state, breakPoint) {
      state.breakPoint = breakPoint
    },
    SET_IS_MOBILE (state, isMobile) {
      state.isMobile = isMobile
    },
    SET_API_HEADER (state, header) {
      state.apiHeader = header
    },
    TOGGLE_NAV_BAR_SHOW (state) {
      state.navBarShow = !state.navBarShow
    },
    CLOSE_NAV_BAR (state) {
      state.navBarShow = false
    }
  },
  actions: {
    setIsLoading ({ commit }, isLoading) {
      commit('SET_IS_LOADING', isLoading)
    },
    setBreakpoint ({ commit }, breakPoint) {
      commit('SET_BREAKPOINT', breakPoint)
    },
    setIsMobile ({ commit }, isMobile) {
      commit('SET_IS_MOBILE', isMobile)
    },
    getAuthorizationHeader ({ commit }) {
      return new Promise((resolve) => {
        const GMTString = new Date().toGMTString()
        const ShaObj = new JsSHA('SHA-1', 'TEXT')
        ShaObj.setHMACKey(process.env.VUE_APP_APIAPPKEY, 'TEXT')
        ShaObj.update('x-date: ' + GMTString)
        const HMAC = ShaObj.getHMAC('B64')
        const Authorization =
          'hmac username="' +
          process.env.VUE_APP_APIAPPID +
          '", algorithm="hmac-sha1", headers="x-date", signature="' +
          HMAC +
          '"'
        commit('SET_API_HEADER', {
          Authorization: Authorization,
          'X-Date': GMTString
        })
        resolve()
      })
    }
  },
  modules: {
    station,
    route
  }
})
