<template>
  <div class="home">
    <!-- banner & search -->
    <div class="banner">
      <div class="container text-white d-flex flex-column align-items-center">
        <h2 class="h1 letter-3">台灣自行車資訊網</h2>
        <div class="input-group mb-3" :class="{ 'w-50': !isMobile }">
          <input
            type="text"
            class="form-control"
            placeholder="請輸入關鍵字"
            aria-label="請輸入關鍵字"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn bg-white" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- main -->
    <div class="container">
      <!-- buttons -->
      <div class="row row-cols-2 row-cols-md-3 justify-content-center my-8">
        <div class="col" :class="{ 'mr-8': !isMobile }">
          <router-link :to="{ name: 'Route' }" custom v-slot="{ navigate }">
            <button
              class="btn btn-primary btn-block shadow py-3 h-100"
              type="button"
              @click="navigate"
              role="link"
            >
              <img
                class="img-fluid mr-4"
                src="../assets/images/line-white-icon.png"
                alt="自行車路線"
                width="44"
                v-if="!isMobile"
              />
              自行車路線
            </button>
          </router-link>
        </div>
        <div class="col">
          <router-link :to="{ name: 'Station' }" custom v-slot="{ navigate }">
            <button
              class="btn btn-warning btn-block text-white shadow py-3 h-100"
              type="button"
              @click="navigate"
              role="link"
            >
              <img
                class="img-fluid mr-4"
                src="../assets/images/bike-white-icon.png"
                alt="單車租借"
                width="39"
                v-if="!isMobile"
              />
              單車租借
            </button>
          </router-link>
        </div>
      </div>
      <!-- news -->
      <section class="my-7">
        <h2 class="text-center letter-5 mb-7">最新公告</h2>
        <ul class="list-group list-group-flush mb-5">
          <li
            class="list-group-item d-flex"
            :class="{ 'flex-column': isMobile }"
            v-for="num in 5"
            :key="num"
          >
            <div>
              <span>緊急通知</span>
              <span>2021 / 11 / 05</span>
            </div>
            <a
              class="d-block flex-grow-1"
              :class="{ 'mt-1': isMobile }"
              href="#"
            >
              <p class="mb-0 d-flex align-items-center">
                2021/11/17 (三) 09:00 - 11:00 台北市 南港區 YouBike
                1.0『凌雲市場』停電通知
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
        </ul>
        <div class="text-center">
          <button class="btn btn-primary shadow" type="button">
            更多最新公告
          </button>
        </div>
      </section>
      <!-- activities -->
      <section class="my-7">
        <h2 class="text-center letter-5 mb-7">近期活動</h2>
        <ul class="list-group list-group-flush mb-5">
          <li
            class="list-group-item d-flex"
            :class="{ 'flex-column': isMobile }"
            v-for="num in 5"
            :key="num"
          >
            <div>
              <span>台南市</span>
              <span>2021 12 / 19</span>
            </div>
            <a
              class="d-block flex-grow-1"
              :class="{ 'mt-1': isMobile }"
              href="#"
            >
              <p class="mb-0 d-flex align-items-center">
                台南YouBike新騎向 越騎越健康 ! 抽Switch主機+健身環 !
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
        </ul>
        <div class="text-center">
          <button class="btn btn-primary shadow" type="button">
            更多活動資訊
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      isMobile: 'isMobile'
    })
  }
}
</script>
