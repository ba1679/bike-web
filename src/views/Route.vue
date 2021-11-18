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
      zoom: 8,
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
    loadBikeShapeData () {
      this.$store.dispatch('setIsLoading', true)
      return this.$store
        .dispatch('route/getCityRouteShape', {
          city: this.citySelect,
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
        this.zoom = 15
        this.map.flyTo(this.center, 15, {
          animate: true
        })
      })
    }
  },
  created () {
    this.loadBikeShapeData()
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
    })
  },
  watch: {
    routesData: {
      deep: true,
      handler (val) {
        this.polyRouteLine()
        if (!val.length) {
          this.$store.commit('route/SET_NO_DATA', true)
        } else if (val.length) {
          this.$store.commit('route/SET_NO_DATA', false)
        }
      }
    },
    noData (val) {
      if (val) alert('查無路線')
    },
    citySelect () {
      this.map.setZoom(8, {
        animate: true
      })
      this.$store.commit('route/SET_AREA_SELECT', null)
    }
  }
}
</script>
