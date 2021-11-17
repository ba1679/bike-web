<template>
  <!-- 1. 預設地圖會顯示整個台灣
2. 進行路線搜尋後，地圖會限縮到該範圍
3. 若查無資料alert(查無資料) -->
  <div class="container-fluid position-relative">
    <LMap
      id="map"
      :center="center"
      :zoom="zoom"
      class="w-100"
      style="height: calc(100vh - 100px)"
    >
      <LTileLayer :options="layerOptions" :tile-layer-class="tileLayerClass" />
    </LMap>
    <div class="card search-card">
      <div class="card-body">
        <h2 class="card-title letter-5">路線搜尋</h2>
        <form class="card-text">
          <div class="form-group">
            <input
              type="text"
              class="form-control font-weight-light"
              placeholder="請輸入路線關鍵字"
            />
          </div>
          <div class="d-flex">
            <div class="form-group mr-3">
              <label for="city">縣市</label>
              <select
                id="city"
                class="form-control custom-select select-icon font-weight-light"
                v-model="citySelect"
              >
                <option selected disabled :value="null">請選擇縣市</option>
                <option
                  v-for="city of cities"
                  :key="city.CityName"
                  :value="city.CityEngName"
                >
                  {{ city.CityName }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="district">鄉鎮區</label>
              <select
                id="district"
                class="form-control custom-select select-icon font-weight-light"
                v-model="areaSelect"
              >
                <option selected disabled :value="null">請選擇鄉鎮</option>
                <option
                  v-for="area of areaList"
                  :key="area.ZipCode"
                  :value="area.AreaEngName"
                >
                  {{ area.AreaName }}
                </option>
              </select>
            </div>
          </div>
        </form>
        <button class="btn btn-primary btn-block btn-sm" type="button">
          搜尋
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css'
import { mapState } from 'vuex'
window.mapboxgl = mapboxgl

export default {
  name: 'Route',
  computed: {
    ...mapState(['cities']),
    areaList () {
      return this.cities.find((item) => item.CityEngName === this.citySelect)
        .AreaList
    }
  },
  data () {
    return {
      center: [23.58259486, 120.58552886],
      zoom: 7,
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
      citySelect: 'Taipei',
      areaSelect: null
    }
  },
  methods: {},
  watch: {
    areaList: {
      handler (val) {
        const [arr] = val
        this.areaSelect = arr.AreaEngName
      }
    }
  }
}
</script>
