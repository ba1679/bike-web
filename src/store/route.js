import axios from 'axios'

export default {
  namespaced: true,
  state: {
    routes: [],
    noData: false,
    areaSelect: null
  },
  getters: {
    filteredRoutes (state) {
      if (state.areaSelect) {
        const filtered = state.routes.filter((r) => r.Town === state.areaSelect)
        return filtered.length ? filtered : []
      } else {
        return state.routes
      }
    }
  },
  mutations: {
    SET_ROUTES (state, routes) {
      state.routes = routes
    },
    CLEAR_ROUTES (state) {
      state.routes = []
    },
    SET_NO_DATA (state, payload) {
      state.noData = payload
    },
    SET_AREA_SELECT (state, area) {
      state.areaSelect = area
    }
  },
  actions: {
    getCityRouteShape ({ dispatch, commit, rootState }, { city, keyword }) {
      dispatch('getAuthorizationHeader', {}, { root: true }).then(() => {
        if (keyword) {
          return axios
            .get(
              `${process.env.VUE_APP_APIPATH}Cycling/Shape/${city}?$filter=contains(RouteName, '${keyword}')&$format=JSON`,
              {
                headers: rootState.apiHeader
              }
            )
            .then((res) => {
              if (!res.data.length) commit('SET_NO_DATA', true)
              else commit('SET_NO_DATA', false)
              commit('SET_ROUTES', res.data)
              return res
            })
            .catch((err) => {
              commit('CLEAR_ROUTES')
              const errText = 'get city bike route shape: ' + err
              return Promise.reject(errText)
            })
        } else {
          return axios
            .get(
              `${process.env.VUE_APP_APIPATH}Cycling/Shape/${city}?$format=JSON`,
              {
                headers: rootState.apiHeader
              }
            )
            .then((res) => {
              commit('SET_ROUTES', res.data)
              return res
            })
            .catch((err) => {
              commit('CLEAR_ROUTES')
              const errText = 'get city bike route shape: ' + err
              return Promise.reject(errText)
            })
        }
      })
    }
  }
}
