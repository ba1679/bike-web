<template>
  <div class="container-fluid position-relative">
    <LMap
      ref="map"
      id="map"
      :zoom="zoom"
      :center="center"
      :zoomAnimation="true"
      class="w-100"
      style="height: calc(100vh - 100px)"
      :max-zoom="19"
    >
      <LTileLayer :options="layerOptions" :tile-layer-class="tileLayerClass" />
      <LGeoJson
        :geojson="geoJsonData"
        :options="geoJsonOptions"
        v-if="geoJsonData.features.length"
      />
    </LMap>
    <SearchCard
      :cities="cities"
      :areaList="areaList"
      :key-word.sync="keyWord"
      :city-select.sync="citySelect"
      :area-select.sync="currArea"
      :inputPlaceholder="'請輸入路線關鍵字(非必填)'"
      @update:keyWord="keyWord = $event"
      @loadCityData="searchShapeData"
      @cleanAreaSelect="cleanAreaSelect"
    >
      <template v-slot:title>
        <h2 class="card-title letter-5">路線搜尋</h2>
      </template>
    </SearchCard>
  </div>
</template>
<script>
import L from 'leaflet'
import { LGeoJson } from 'vue2-leaflet'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css'
import Wkt from 'wicket'
import { mapState, mapGetters } from 'vuex'
import SearchCard from '@/components/SearchCard.vue'
window.mapboxgl = mapboxgl

export default {
  name: 'Route',
  components: {
    SearchCard,
    LGeoJson
  },
  computed: {
    ...mapState(['cities']),
    ...mapState('route', ['areaSelect', 'noData']),
    ...mapGetters({
      routesData: 'route/filteredRoutes'
    }),
    areaList () {
      return this.cities.find((item) => item.CityEngName === this.citySelect)
        .AreaList
    },
    currArea: {
      get () {
        return this.areaSelect
      },
      set (val) {
        this.$store.commit('route/SET_AREA_SELECT', val)
      }
    },
    center () {
      const [position] = this.geoJsonData.features
      if (!!position && position) {
        const [long, lat] = position.geometry.coordinates[0][0]
        return [lat, long]
      } else {
        return [23.58259486, 120.58552886]
      }
    }
  },
  data () {
    return {
      map: null,
      zoom: 13,
      tileLayerClass: (url, options) => L.mapboxGL(options),
      layerOptions: {
        accessToken:
          'pk.eyJ1IjoiaHNpbmh1aSIsImEiOiJja3Z3NnFrejIwNWd6Mm9uMDNiNGJ0bGxkIn0.xezbS4RWCo5XLQQLjZVc_g',
        style: 'mapbox://styles/mapbox/streets-v11',
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1
      },
      keyWord: '',
      citySelect: 'Taipei',
      geoJsonData: {
        features: []
      },
      geoJsonOptions: {
        style: function () {
          return {
            weight: 7,
            color: '#0D706D'
          }
        },
        onEachFeature: function (feature, layer) {
          const properties = feature.properties
          layer.bindPopup(
            `
           <div class="card popup">
              <div class="card-body">
                <h3>${properties.name}</h3>
                <p>${properties.city}</p>
                <p>${properties.start} - ${properties.end}</p>
                <p>全長: ${properties.cyclingLength}</p>
              </div>
            </div>
          `,
            { minWidth: 250 }
          )
        }
      }
    }
  },
  methods: {
    loadBikeShapeData (city = this.citySelect) {
      this.$store.dispatch('setIsLoading', true)
      return this.$store
        .dispatch('route/getCityRouteShape', {
          city,
          keyword: this.keyWord
        })
        .then(() => {
          this.$store.dispatch('setIsLoading', false)
        })
        .catch((err) => {
          this.$store.dispatch('setIsLoading', false)
          console.log(err)
        })
    },
    polyRouteLine () {
      const wkt = new Wkt.Wkt()
      this.geoJsonData = { features: [] }
      this.routesData.forEach((r) => {
        this.geoJsonData.features.push({
          type: 'Feature',
          geometry: wkt.read(r.Geometry).toJson(),
          properties: {
            name: r.RouteName,
            city: r.City,
            start: r.RoadSectionStart ? r.RoadSectionStart : '無提供起點',
            end: r.RoadSectionEnd ? r.RoadSectionEnd : '無提供終點',
            cyclingLength: r.CyclingLength ? `${r.CyclingLength} m` : '-'
          }
        })
      })
    },
    searchShapeData () {
      return this.loadBikeShapeData().then(() => {
        this.map.flyTo(this.center, 10, {
          animate: true
        })
      })
    },
    getLocationCity (lat, long) {
      return this.axios
        .get(
          `https://api.nlsc.gov.tw/other/TownVillagePointQuery/${long}/${lat}`
        )
        .then((res) => {
          const { ctyName, townName } = res.data
          const enCity = this.cities.find((item) => {
            return item.CityName === ctyName
          })
          const currArea = enCity.AreaList.find((item) => {
            return item.AreaName === townName
          }).AreaName
          this.citySelect = enCity.CityEngName
          this.$store.commit('route/SET_AREA_SELECT', currArea)
          return res
        })
    },
    cleanAreaSelect () {
      this.$store.commit('route/SET_AREA_SELECT', null)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        this.getLocationCity(latitude, longitude).then(() => {
          this.loadBikeShapeData(this.citySelect)
        })
      })
    })
  },
  watch: {
    routesData: {
      deep: true,
      handler () {
        this.polyRouteLine()
      }
    },
    noData (val) {
      if (val) alert('查無路線')
    }
  }
}
</script>
