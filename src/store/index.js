import Vue from 'vue'
import Vuex from 'vuex'
import cities from '@/assets/cities.json'
import axios from 'axios'
import qs from 'qs'

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
      const parameter = {
        grant_type: 'client_credentials',
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRECT
      }

      const config = {
        method: 'post',
        url: process.env.VUE_APP_AUTH_URL,
        data: qs.stringify(parameter),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      return axios.request(config)
        .then((res) => {
          commit('SET_API_HEADER', { Authorization: `Bearer ${res.data.access_token}` })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
    station,
    route
  }
})
