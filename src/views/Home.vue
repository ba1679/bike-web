<template>
  <div class="home">
    <!-- banner & search -->
    <div class="position-relative">
      <img
        src="../assets/images/banner.png"
        alt="台灣自行車資訊網封面"
        class="w-100"
      />
      <div
        class="
          container
          center-position
          text-white
          d-flex
          flex-column
          align-items-center
        "
      >
        <h2 class="h1 letter-3">台灣自行車資訊網</h2>
        <div class="input-group mb-3 w-50">
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
      <div class="row row-cols-md-3 justify-content-center my-8">
        <div class="col mr-8">
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
                alt="自行車路線"
                width="39"
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
          <li class="list-group-item d-flex">
            <span>緊急通知</span>
            <span>2021 / 11 / 05</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                2021/11/17 (三) 09:00 - 11:00 台北市 南港區 YouBike
                1.0『凌雲市場』停電通知
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>緊急通知</span>
            <span>2021 / 11 / 05</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                2021/11/17 (三) 09:00 - 11:00 台北市 南港區 YouBike
                1.0『凌雲市場』停電通知
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>緊急通知</span>
            <span>2021 / 11 / 05</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                2021/11/17 (三) 09:00 - 11:00 台北市 南港區 YouBike
                1.0『凌雲市場』停電通知
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>緊急通知</span>
            <span>2021 / 11 / 05</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                2021/11/17 (三) 09:00 - 11:00 台北市 南港區 YouBike
                1.0『凌雲市場』停電通知
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>緊急通知</span>
            <span>2021 / 11 / 05</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
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
          <li class="list-group-item d-flex">
            <span>台南市</span>
            <span>2021 12 / 19</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                台南YouBike新騎向 越騎越健康 ! 抽Switch主機+健身環 !
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>彰化縣</span>
            <span>2021 12 / 19</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                彰化YouBike新騎向 越騎越健康 ! 抽Switch主機+健身環 !
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>屏東縣</span>
            <span>2021 11 / 06 - 11 / 07</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                屏東YouBike新騎向 越騎越健康 ! 抽Switch主機+健身環 !
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>新北市</span>
            <span>2021 10 / 10 - 11 / 10</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                新北YouBike新騎向 越騎越健康 ! 抽Switch主機+健身環 !
                <i class="fas fa-chevron-right text-gray ml-auto"></i>
              </p>
            </a>
          </li>
          <li class="list-group-item d-flex">
            <span>高雄市</span>
            <span>2021 10 / 09 - 11 / 06</span>
            <a class="d-block flex-grow-1" href="#">
              <p class="mb-0 d-flex">
                高雄YouBike新騎向 越騎越健康 ! 抽Switch主機+健身環 !
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
export default {
  name: 'Home'
}
</script>
