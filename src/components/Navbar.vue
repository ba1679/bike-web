<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#"
            >最新消息 <span class="sr-only">(current)</span></a
          >
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
  </nav>
</template>
<script>
export default {
  computed: {
    routeName () {
      return this.$route.name
    }
  }
}
</script>
