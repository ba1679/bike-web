<template>
  <div class="container bulletin">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent font-weight-light">
        <li class="breadcrumb-item"><a href="#">首頁</a></li>
        <li class="breadcrumb-item"><a href="#">最新消息</a></li>
        <li class="breadcrumb-item active" aria-current="page">最新公告</li>
      </ol>
    </nav>
    <section class="mb-7">
      <div class="h1 text-center mb-5">最新公告</div>
      <div class="container">
        <div class="d-flex justify-content-center">
          <div class="form-group row mr-5">
            <label for="category" class="col-sm-5 col-form-label"
              >選擇分類</label
            >
            <div class="col-sm-7">
              <select
                id="category"
                class="form-control custom-select-sm font-weight-light"
              >
                <option selected>全部分類</option>
                <option>緊急通知</option>
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
          <div class="ml-5">
            <button type="button" class="btn btn-warning btn-sm text-white">
              查詢
            </button>
          </div>
        </div>
        <ul class="list-group list-group-flush my-3">
          <li
            class="list-group-item d-flex"
            :class="{ 'flex-column': isMobile }"
            v-for="num in 10"
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
