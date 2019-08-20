## OZBackend 說明
### 功能
* 以yml設定檔建立routes
* 以yml設定檔建立資料存取之api連線設定
* 支援firebase
* 單元測試
* 提供開發SPA web前端框架
* 提供建立Cordova App架構
* 提供建立Electron應用程式架構
  
### 自動安裝
* clone專案後 可透過shell完成所有安裝
  ```
  sh init.sh
  ```
### 手動安裝
* 安裝global工具
  ```
  npm install gulp vue-cli
  ```
* 目錄下執行
  ```
  npm install
  ```
* 建立初始化設定
  ```
  gulp init
  ```
### 開發指令
* 建立專案初始化資料
  ```
  gulp init
  ```
* 開發期間編譯 並做hot-reload
  ```
  gulp
  ```
* minify編譯 為production檔案 輸出到www目錄
  ```
  gulp build
  ```
* 執行單元測試，測試結果在test/report.log
  ```
  gulp test
  ```
### 設定檔
* conf/index.yml 主設定檔
* conf/api.yml 設定api連線資訊
* conf/routes.yml 設定routes
### 規格
* 主系統框架: Vue.js https://vuejs.org/
* Router: Vue Router https://router.vuejs.org/
* State: Vuex https://vuex.vuejs.org/
* UI: ElementUI https://element.eleme.io/#/en-US/component/installation
* API Request: Axios https://github.com/axios/axios
* 單元測試: jest https://jestjs.io/en/
* Task Runner: gulp https://gulpjs.com/
* Socket: SocketIO https://socket.io/
### 使用

