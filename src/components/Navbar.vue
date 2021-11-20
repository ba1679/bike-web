<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light position-relative">
    <h1>
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <img
          src="../assets/images/logo-icon.png"
          width="46"
          height="46"
          class="d-inline-block align-top mr-2"
          alt=""
        />
        <div class="h6">
          <div class="logo-font letter-2">
            TAIWAN BIKE <br />台灣自行車資訊網
          </div>
        </div>
      </router-link>
    </h1>
    <button class="navbar-toggler" type="button" @click="showNavbar">
      <span class="navbar-toggler-icon" v-if="!navBarShow"></span>
      <i class="fas fa-times" v-else></i>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Bulletin' }"
            >最新消息 <span class="sr-only">(current)</span>
          </router-link>
          <ul class="list-unstyled nav-child">
            <li class="pb-1">
              <router-link :to="{ name: 'Bulletin' }">最新公告</router-link>
            </li>
            <li class="mt-1">
              <router-link :to="{ name: 'Activities' }">活動資訊</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item" :class="{ active: routeName === 'Route' }">
          <router-link class="nav-link" :to="{ name: 'Route' }"
            >自行車路線<span class="sr-only" v-if="routeName === 'Route'"
              >(current)</span
            >
          </router-link>
        </li>
        <li class="nav-item" :class="{ active: routeName === 'Station' }">
          <router-link class="nav-link" :to="{ name: 'Station' }"
            >單車租借<span class="sr-only" v-if="routeName === 'Station'"
              >(current)</span
            ></router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">騎乘小叮嚀</a>
        </li>
      </ul>
    </div>
    <transition name="slide">
      <div class="nav-mb" v-if="navBarShow">
        <div class="container">
          <div class="input-group">
            <input
              type="text"
              class="form-control nav-mb-shadow"
              placeholder="請輸入關鍵字"
              aria-label="請輸入關鍵字"
            />
            <div class="input-group-append">
              <button class="btn bg-white nav-mb-shadow" type="button">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div class="line"></div>
          <div class="container letter-2">
            <div class="row justify-content-between">
              <div class="col-6">
                <div class="h3 font-weight-bold mb-2">最新消息</div>
                <ul class="list-unstyled">
                  <li class="h3 font-weight-light mb-2">
                    <router-link :to="{ name: 'Bulletin' }"
                      >最新公告</router-link
                    >
                  </li>
                  <li class="h3 font-weight-light">
                    <router-link :to="{ name: 'Activities' }"
                      >活動資訊</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <div class="h3 font-weight-bold mb-2">自行車路線</div>
                <ul class="list-unstyled">
                  <li class="h3 font-weight-light mb-2">
                    <router-link :to="{ name: 'Route' }"
                      >自行車路線</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <div class="h3 font-weight-bold mb-2">單車租借</div>
                <ul class="list-unstyled">
                  <li class="h3 font-weight-light mb-2">
                    <router-link :to="{ name: 'Station' }"
                      >單車租借</router-link
                    >
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <div class="h3 font-weight-bold">騎乘小叮嚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      navBarShow: 'navBarShow'
    }),
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    showNavbar () {
      this.$store.commit('TOGGLE_NAV_BAR_SHOW')
    }
  }
}
</script>
