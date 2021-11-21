# 臺灣自行車資訊網

Demo: https://ba1679.github.io/bike-web/

## 簡介
以 Vue CLI3 實作專案，串接由臺灣交通部提供之 TDX API 取得**臺灣自行車路線、租借站相關資料**，可用搜尋或下拉選單選擇想查看縣市資料，資料由地圖標呈現。

## 使用技術
### 網頁切版:
   * HTML5、CSS3、Scss
   * bootstrap 4 格線系統、元件、utilities使用、客製 bootstrap 變數
   * RWD 響應式顯示
### 前端開發&框架:
   * Vue CLI 搭配Webpack建置專案
   * Vue.js + javaScript(ES6)資料處理及渲染
   * Vuex 模組化資料管理、API 資料整理
   * Vue Router 頁面切換
   * jQuery 操作 DOM 元素
   * Vue transition 處理動畫效果
   * web API 自動定位
### 第三方套件運用:
   * Axios 串接 API 更新資料
   * Vue loading overlay
   * vue2-leaflet 與 API 資料結合顯示於地圖
   * vue2-leaflet-markercluster 優化地圖 marker 
   * mapbox-gl 圖資
   
### 首頁 : 

首頁為模擬最新資訊、搜尋功能，因無 API 資料，所以目前為假資料
![image alt](https://upload.cc/i1/2021/11/21/fk6TqO.png)

### 路線頁面 : 
1. 載入即自動定位並顯示所在區域之自行車路線
2. 點擊路線可查看詳細資料，起點、終點、總長度等
![image alt](https://upload.cc/i1/2021/11/21/XzGba4.png)

### 租借站頁面 : 
1. 載入即自動定位並顯示所在區域之所有租借站資料
2. 圖標顏色代表租借站 可借/可還 的空位 (綠色表示最多、紅色表示低於五台、灰色為暫停營運)
3. 切換借還車按鈕可決定圖標顏色判斷的主題
4. 點擊圖標可顯示詳細資料，地址、租借空位等
![image alt](https://upload.cc/i1/2021/11/21/zhgput.png)
