<template>
  <div class="container-fluid position-relative px-0">
    <LMap
      ref="map"
      id="map"
      :center="center"
      :zoom="zoom"
      class="w-100 map-height"
      :maxZoom="19"
    >
      <LTileLayer :options="layerOptions" :tile-layer-class="tileLayerClass" />
      <v-marker-cluster>
        <LMarker
          v-for="(marker, index) in markerData"
          :key="index"
          :lat-lng="marker.position"
        >
          <LIcon
            :icon-size="layerOptions.iconSize"
            :icon-anchor="layerOptions.iconAnchor"
            :icon-url="
              iconColor(
                marker.serviceStatus,
                marker.rentIcon,
                marker.returnIcon
              )
            "
          />
          <LPopup :options="{ minWidth: 350 }">
            <div class="card popup">
              <div class="card-body">
                <h3>{{ marker.name }}</h3>
                <p>{{ marker.address }}</p>
                <p>更新時間 : {{ marker.updateTime }}</p>
                <div class="container">
                  <div class="row">
                    <template v-if="marker.serviceStatus === 1">
                      <div class="col info-card mr-1" :class="marker.rentIcon">
                        <p class="font-weight-bold">可借車輛</p>
                        <p class="h2 my-0">{{ marker.avaRent }}</p>
                      </div>
                      <div class="col info-card" :class="marker.returnIcon">
                        <p class="font-weight-bold">可停空位</p>
                        <p class="h2 my-0">{{ marker.avaReturn }}</p>
                      </div>
                    </template>
                    <div class="col info-card bg-gray-300" v-else>
                      <p class="font-weight-bold">停止/暫停營運</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LPopup>
        </LMarker>
      </v-marker-cluster>
    </LMap>
    <div class="d-flex rent-btn">
      <button
        class="btn btn-black mr-2"
        :class="{ 'btn-gray-300': serviceSelect !== 'rent' }"
        type="button"
        @click="serviceSelect = 'rent'"
      >
        借車
      </button>
      <button
        class="btn btn-black"
        :class="{ 'btn-gray-300': serviceSelect !== 'return' }"
        type="button"
        @click="serviceSelect = 'return'"
      >
        還車
      </button>
    </div>
    <SearchCard
      :cities="cities"
      :key-word.sync="keyWord"
      :city-select.sync="citySelect"
      :inputPlaceholder="'請輸入站牌關鍵字(非必填)'"
      @update:keyWord="keyWord = $event"
      @loadCityData="loadCityStationsData"
      @toggleSearchCard="toggleSearchCard"
      :searchCardShow="searchCardShow"
    >
      <template v-slot:title>
        <h2 class="card-title letter-5">站牌搜尋</h2>
      </template>
    </SearchCard>
  </div>
</template>
<script>
import L from 'leaflet'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapState, mapGetters } from 'vuex'
import { format } from 'date-fns'
import SearchCard from '@/components/SearchCard.vue'
window.mapboxgl = mapboxgl

export default {
  name: 'Station',
  components: {
    SearchCard
  },
  computed: {
    ...mapState('station', ['noData']),
    ...mapGetters({
      isMobile: 'isMobile',
      stationsData: 'station/stationsAndAvailability'
    }),
    center () {
      return this.markerData[0]?.position || [25.0408578889, 121.567904444]
    }
  },
  data () {
    return {
      map: null,
      cities: [
        {
          CityName: '臺中市',
          CityEngName: 'Taichung'
        },
        {
          CityName: '新竹市',
          CityEngName: 'Hsinchu'
        },
        {
          CityName: '苗栗縣',
          CityEngName: 'MiaoliCounty'
        },
        {
          CityName: '新北市',
          CityEngName: 'NewTaipei'
        },
        {
          CityName: '屏東縣',
          CityEngName: 'PingtungCounty'
        },
        {
          CityName: '金門縣',
          CityEngName: 'KinmenCounty'
        },
        {
          CityName: '桃園市',
          CityEngName: 'Taoyuan'
        },
        {
          CityName: '臺北市',
          CityEngName: 'Taipei'
        },
        {
          CityName: '高雄市',
          CityEngName: 'Kaohsiung'
        },
        {
          CityName: '臺南市',
          CityEngName: 'Tainan'
        },
        {
          CityName: '嘉義市',
          CityEngName: 'Chiayi'
        }
      ],
      zoom: 15,
      tileLayerClass: (url, options) => L.mapboxGL(options),
      layerOptions: {
        accessToken:
          'pk.eyJ1IjoiaHNpbmh1aSIsImEiOiJja3Z3NnFrejIwNWd6Mm9uMDNiNGJ0bGxkIn0.xezbS4RWCo5XLQQLjZVc_g',
        style: 'mapbox://styles/mapbox/streets-v11',
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1,
        iconSize: [30, 40],
        iconAnchor: [15, 0]
      },
      markerData: [],
      citySelect: 'Taipei',
      serviceSelect: 'rent',
      dataLoaded: false,
      keyWord: '',
      searchCardShow: true
    }
  },
  methods: {
    updateMarker () {
      this.markerData = []
      for (const data of this.stationsData) {
        const markers = {
          UID: data.StationUID,
          position: [
            data.StationPosition.PositionLat,
            data.StationPosition.PositionLon
          ],
          address: data.StationAddress.Zh_tw,
          name: data.StationName.Zh_tw,
          updateTime: format(new Date(data.UpdateTime), 'yyyy-MM-dd HH:mm:ss'),
          serviceType: data.ServiceType,
          serviceStatus: data.ServiceStatus,
          avaRent: data.AvailableRentBikes,
          avaReturn: data.AvailableReturnBikes
        }
        const { avaRent, avaReturn } = markers
        if (avaRent <= 5 && avaRent > 0) {
          markers.rentIcon = 'bg-green-200'
        } else if (avaRent > 5) {
          markers.rentIcon = 'bg-green'
        } else if (avaRent === 0) {
          markers.rentIcon = 'bg-danger'
        }
        if (avaReturn <= 5 && avaReturn > 0) {
          markers.returnIcon = 'bg-green-200'
        } else if (avaReturn > 5) {
          markers.returnIcon = 'bg-green'
        } else if (avaReturn === 0) {
          markers.returnIcon = 'bg-danger'
        }
        this.markerData.push(markers)
      }
      if (this.markerData[0]?.position) {
        this.map.flyTo(this.markerData[0].position, 15, {
          animate: true
        })
      }
      this.$store.dispatch('setIsLoading', false)
    },
    loadCityStationsData () {
      this.$store.dispatch('setIsLoading', true)
      return this.$store
        .dispatch('station/fetchCityStationsData', {
          city: this.citySelect,
          keyword: this.keyWord
        })
        .then(() => {
          if (this.isMobile) this.searchCardShow = false
        })
        .catch((err) => {
          this.$store.dispatch('setIsLoading', false)
          console.log(err)
        })
    },
    loadNearByCityStationData (lat, long) {
      this.$store.dispatch('setIsLoading', true)
      if (lat && long) {
        this.getLocationCity(lat, long)
        return this.$store
          .dispatch('station/fetchNearByCityStationsData', { lat, long })
          .then(() => {
            this.$store.dispatch('setIsLoading', false)
          })
          .catch((err) => {
            this.$store.dispatch('setIsLoading', false)
            console.log(err)
          })
      } else {
        this.loadCityStationsData()
      }
    },
    iconColor (serviceStatus, rentIcon, returnIcon) {
      if (this.serviceSelect === 'rent') {
        if (serviceStatus !== 1) {
          return require('@/assets/images/gray-2-marker.png')
        }
        switch (rentIcon) {
          case 'bg-green-200':
            return require('@/assets/images/green-2-marker.png')
          case 'bg-green':
            return require('@/assets/images/green-marker.png')
          case 'bg-danger':
            return require('@/assets/images/error-marker.png')
          default:
            break
        }
      } else {
        if (serviceStatus !== 1) {
          return require('@/assets/images/gray-2-marker.png')
        }
        switch (returnIcon) {
          case 'bg-green-200':
            return require('@/assets/images/green-2-marker.png')
          case 'bg-green':
            return require('@/assets/images/green-marker.png')
          case 'bg-danger':
            return require('@/assets/images/error-marker.png')
          default:
            break
        }
      }
    },
    getLocationCity (lat, long) {
      this.axios
        .get(
          `https://api.nlsc.gov.tw/other/TownVillagePointQuery/${long}/${lat}`
        )
        .then((res) => {
          const city = res.data.ctyName
          const enCity = this.cities.find((item) => {
            return item.CityName === city
          })
          this.citySelect = enCity.CityEngName
        })
    },
    toggleSearchCard () {
      this.searchCardShow = !this.searchCardShow
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        this.loadNearByCityStationData(latitude, longitude)
      })
    })
  },
  watch: {
    stationsData: {
      deep: true,
      handler () {
        this.updateMarker()
      }
    },
    noData (val) {
      if (val) alert('查無資料')
    }
  }
}
</script>
