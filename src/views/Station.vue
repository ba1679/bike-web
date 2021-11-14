<template>
  <!-- 1. 預設地圖會預設顯示臺北市區域，並且預設顯示借車的所有站牌
2. 進行站牌搜尋後，地圖會限縮到該範圍
3. 點選圖標會popup顯示詳細資訊
4. 上方借車還車btn會切換圖標的資訊，借車：顯示剩餘車輛/還車：顯示剩餘空位的資訊 -->
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
        <h2 class="card-title letter-5">站牌搜尋</h2>
        <form class="card-text">
          <div class="form-group">
            <input
              type="text"
              class="form-control font-weight-light"
              placeholder="請輸入站牌關鍵字"
            />
          </div>
          <div class="d-flex">
            <div class="form-group mr-3">
              <label for="city">縣市</label>
              <select id="city" class="form-control custom-select select-icon">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="form-group">
              <label for="district">鄉鎮區</label>
              <select
                id="district"
                class="form-control custom-select select-icon"
              >
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
          </div>
        </form>
        <button class="btn btn-primary btn-block btn-sm" type="button">
          搜尋
        </button>
      </div>
    </div>
    <div class="d-flex rent-btn">
      <button class="btn btn-black mr-2" type="button">借車</button>
      <button class="btn btn-gray-200" type="button">還車</button>
    </div>
  </div>
</template>
<script>
import L from 'leaflet'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'leaflet/dist/leaflet.css'
window.mapboxgl = mapboxgl

export default {
  name: 'Station',
  components: {
    // LMarker,
    // LPopup,
    // LTooltip
  },
  data () {
    return {
      center: [25.06, 121.31],
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
      }
    }
  },
  methods: {}
}
</script>
