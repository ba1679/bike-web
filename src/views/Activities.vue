<template>
  <div class="container bulletin">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent font-weight-light">
        <li class="breadcrumb-item"><a href="#">首頁</a></li>
        <li class="breadcrumb-item"><a href="#">最新消息</a></li>
        <li class="breadcrumb-item active" aria-current="page">活動資訊</li>
      </ol>
    </nav>
    <section class="mb-7">
      <div class="h1 text-center mb-5">活動資訊</div>
      <div class="container">
        <div
          class="d-flex justify-content-center mb-3 mb-lg-0"
          :class="{ 'flex-column': isMobile }"
        >
          <div class="form-group row mr-lg-5">
            <label for="category" class="col-sm-5 col-form-label"
              >選擇區域</label
            >
            <div class="col-sm-7">
              <select
                id="category"
                class="form-control custom-select-sm font-weight-light"
              >
                <option selected>全部區域</option>
                <option>台中市</option>
                <option>營運資訊</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="time" class="col-sm-5 col-form-label">選擇時間</label>
            <div class="col-sm-7">
              <select
                id="time"
                class="form-control custom-select-sm font-weight-light"
              >
                <option selected>全部年份</option>
                <option>2021</option>
                <option>2020</option>
              </select>
            </div>
          </div>
          <div class="ml-lg-5" :class="{ 'text-right': isMobile }">
            <button type="button" class="btn btn-warning btn-sm text-white">
              查詢
            </button>
          </div>
        </div>
        <ul class="list-group list-group-flush mb-5">
          <li
            class="list-group-item d-flex"
            :class="{ 'flex-column': isMobile }"
            v-for="num in 10"
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
        <nav aria-label="分頁控制">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" aria-label="Previous">
                <i class="fas fa-chevron-left"></i>
              </a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Bulletin',
  computed: {
    ...mapGetters({
      isMobile: 'isMobile'
    })
  }
}
</script>
