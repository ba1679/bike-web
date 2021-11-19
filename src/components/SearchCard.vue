<template>
  <div class="card search-card" :class="position">
    <div class="text-center" v-if="isMobile">
      <button class="btn" type="button" @click="toToggleSearchCard">
        <i class="fas fa-chevron-down" v-if="searchCardShow"></i>
        <i class="fas fa-chevron-up" v-else></i>
      </button>
    </div>
    <transition name="slide-out" mode="out-in">
      <div class="card-body" v-if="searchCardShow">
        <slot name="title"> </slot>
        <form class="card-text" @submit.prevent>
          <div class="form-group">
            <input
              type="text"
              class="form-control font-weight-light"
              :placeholder="inputPlaceholder"
              v-model="childKeyWord"
              @keyup.enter.prevent="toLoadData"
            />
          </div>
          <div class="d-flex">
            <div class="form-group flex-grow-1">
              <label for="city">縣市 <span class="text-danger"> *</span></label>
              <select
                id="city"
                class="form-control custom-select select-icon font-weight-light"
                v-model="childCitySelect"
                @change="toCleanAreaSelect"
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
    </transition>
  </div>
</template>
<script>
import cities from '@/assets/cities.json'
import { mapGetters } from 'vuex'

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
    },
    searchCardShow: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'isMobile'
    }),
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
    },
    position () {
      if (!this.isMobile) {
        return 'search-card-position'
      } else {
        return 'search-card-position-md'
      }
    }
  },
  methods: {
    toLoadData () {
      this.$emit('loadCityData')
    },
    toCleanAreaSelect () {
      this.$emit('cleanAreaSelect')
    },
    toToggleSearchCard () {
      this.$emit('toggleSearchCard')
    }
  }
}
</script>
