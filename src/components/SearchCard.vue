<template>
  <div class="card search-card">
    <div class="card-body">
      <h2 class="card-title letter-5">站牌搜尋</h2>
      <form class="card-text">
        <div class="form-group">
          <input
            type="text"
            class="form-control font-weight-light"
            placeholder="請輸入站牌關鍵字"
            v-model="keyWord"
          />
        </div>
        <div class="form-group">
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
      </form>
      <button
        class="btn btn-primary btn-block btn-sm"
        type="button"
        @click="loadCityStationsData"
      >
        搜尋
      </button>
    </div>
  </div>
</template>
<script>
import cities from '@/assets/cities.json'

export default {
  name: 'SearchChard',
  props: {
    cities: {
      type: Array,
      default: cities
    }
  },
  data () {
    return {}
  }
}
</script>
