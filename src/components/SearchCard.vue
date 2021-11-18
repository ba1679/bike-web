<template>
  <div class="card search-card">
    <div class="card-body">
      <slot name="title"> </slot>
      <form class="card-text">
        <div class="form-group">
          <input
            type="text"
            class="form-control font-weight-light"
            :placeholder="inputPlaceholder"
            v-model="childKeyWord"
          />
        </div>
        <div class="d-flex">
          <div class="form-group flex-grow-1">
            <label for="city">縣市 <span class="text-danger"> *</span></label>
            <select
              id="city"
              class="form-control custom-select select-icon font-weight-light"
              v-model="childCitySelect"
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
          <div class="form-group ml-1" v-if="$route.name === 'Route'">
            <label for="district">鄉鎮區</label>
            <select
              id="district"
              class="form-control custom-select select-icon font-weight-light"
              v-model="childAreaSelect"
            >
              <option selected :value="null">請選擇鄉鎮</option>
              <option
                v-for="(area, i) of areaList"
                :key="i"
                :value="area.AreaName"
              >
                {{ area.AreaName }}
              </option>
            </select>
          </div>
        </div>
      </form>
      <button
        class="btn btn-primary btn-block btn-sm"
        type="button"
        @click="toLoadData"
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
    },
    keyWord: {
      type: String
    },
    citySelect: {
      type: String
    },
    inputPlaceholder: {
      type: String
    },
    areaList: {
      type: Array
    },
    areaSelect: {
      type: String
    }
  },
  computed: {
    childKeyWord: {
      get () {
        return this.keyWord
      },
      set (val) {
        this.$emit('update:keyWord', val)
      }
    },
    childCitySelect: {
      get () {
        return this.citySelect
      },
      set (val) {
        this.$emit('update:citySelect', val)
      }
    },
    childAreaSelect: {
      get () {
        return this.areaSelect
      },
      set (val) {
        this.$emit('update:areaSelect', val)
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    toLoadData () {
      this.$emit('loadCityData')
    }
  }
}
</script>
