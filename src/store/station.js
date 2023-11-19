import axios from 'axios'

export default {
  namespaced: true,
  state: {
    stations: [],
    stationsAvailability: [],
    noData: false
  },
  getters: {
    stations (state) {
      return state.stations
    },
    stationsAvailability (state) {
      return state.stationsAvailability
    },
    stationsAndAvailability (state) {
      const data = []
      state.stations.forEach((stationItem) => {
        state.stationsAvailability.forEach((avaItem) => {
          if (avaItem.StationUID === stationItem.StationUID) {
            avaItem.StationName = stationItem.StationName
            avaItem.StationAddress = stationItem.StationAddress
            avaItem.StationPosition = stationItem.StationPosition
            data.push(avaItem)
          }
        })
      })
      return data
    }
  },
  mutations: {
    SET_STATIONS (state, stations) {
      state.stations = stations
    },
    CLEAR_STATIONS (state) {
      state.stations = []
    },
    SET_STATIONS_AVAILABILITY (state, data) {
      state.stationsAvailability = data
    },
    CLEAR_STATIONS_AVAILABILITY (state) {
      state.stationsAvailability = []
    },
    SET_NO_DATA (state, payload) {
      state.noData = payload
    }
  },
  actions: {
    fetchCityStationsData ({ dispatch, commit }, { city, keyword }) {
      return new Promise((resolve, reject) => {
        return dispatch('getCityBikeStations', { city, keyword })
          .then(() => {
            return dispatch('getCityBikeStationsAvailability', {
              city
            })
          })
          .then(() => {
            resolve()
          })
          .catch((err) => {
            commit('CLEAR_STATIONS')
            commit('CLEAR_STATIONS_AVAILABILITY')
            const errText = 'fetch stations data: ' + err
            reject(errText)
          })
      })
    },
    fetchNearByCityStationsData ({ dispatch, commit }, { lat, long }) {
      return new Promise((resolve, reject) => {
        return dispatch('getNearByCityBikeStations', { lat, long })
          .then(() => {
            return dispatch('getNearByCityBikeStationsAvailability', {
              lat,
              long
            })
          })
          .then(() => {
            resolve()
          })
          .catch((err) => {
            commit('CLEAR_STATIONS')
            commit('CLEAR_STATIONS_AVAILABILITY')
            const errText = 'fetch nearby stations data: ' + err
            reject(errText)
          })
      })
    },
    getCityBikeStations ({ dispatch, commit, rootState }, { city, keyword }) {
      dispatch('getAuthorizationHeader', {}, { root: true }).then(async () => {
        if (keyword) {
          try {
            const res = await axios
              .get(
                `${process.env.VUE_APP_API_DOMAIN}/v2/Bike/Station/City/${city}?$filter=contains(StationName/Zh_tw, '${keyword}')`,
                {
                  headers: rootState.apiHeader
                }
              )
            if (!res.data.length) commit('SET_NO_DATA', true)
            else commit('SET_NO_DATA', false)
            commit('SET_STATIONS', res.data)
            return res
          } catch (err) {
            const errText = 'get city bike station: ' + err
            return await Promise.reject(errText)
          }
        } else {
          try {
            const res = await axios
              .get(
                `${process.env.VUE_APP_API_DOMAIN}/v2/Bike/Station/City/${city}?$format=JSON`,
                {
                  headers: rootState.apiHeader
                }
              )
            commit('SET_STATIONS', res.data)
            return res
          } catch (err) {
            const errText = 'get city bike station: ' + err
            return await Promise.reject(errText)
          }
        }
      })
    },
    getCityBikeStationsAvailability ({ dispatch, commit, rootState }, { city }) {
      dispatch('getAuthorizationHeader', {}, { root: true }).then(async () => {
        try {
          const res = await axios
            .get(
              `${process.env.VUE_APP_API_DOMAIN}/v2/Bike/Availability/City/${city}?$format=JSON`,
              {
                headers: rootState.apiHeader
              }
            )
          commit('SET_STATIONS_AVAILABILITY', res.data)
          return res
        } catch (err) {
          const errText = 'get city bike station availability: ' + err
          return await Promise.reject(errText)
        }
      })
    },
    getNearByCityBikeStations ({ dispatch, commit, rootState }, { lat, long }) {
      dispatch('getAuthorizationHeader', {}, { root: true }).then(async () => {
        try {
          const res = await axios
            .get(
              `${process.env.VUE_APP_API_DOMAIN}/v2/Bike/Station/NearBy?$spatialFilter=nearby(${lat},${long} 
            ,1000)&$format=JSON`,
              {
                headers: rootState.apiHeader
              }
            )
          if (!res.data.length) commit('SET_NO_DATA', true)
          else commit('SET_NO_DATA', false)
          commit('SET_STATIONS', res.data)
          return res
        } catch (err) {
          const errText = 'get nearby city bike station: ' + err
          return await Promise.reject(errText)
        }
      })
    },
    getNearByCityBikeStationsAvailability (
      { dispatch, commit, rootState },
      { lat, long }
    ) {
      dispatch('getAuthorizationHeader', {}, { root: true }).then(() => {
        return axios
          .get(
            `${process.env.VUE_APP_API_DOMAIN}/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${lat},${long} 
            ,1000)&$format=JSON`,
            {
              headers: rootState.apiHeader
            }
          )
          .then((res) => {
            commit('SET_STATIONS_AVAILABILITY', res.data)
            return res
          })
          .catch((err) => {
            const errText = 'get nearby city bike station availability : ' + err
            return Promise.reject(errText)
          })
      })
    }
  }
}
