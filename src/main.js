import 'default-passive-events'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCompositionApi from '@vue/composition-api'
import router from './utils/router'
import store from './store'
import App from './App.vue'
import { initFirebase } from '@/utils/firebase'
import { apiData, stageData } from './config'
// 初始化 產生api
import { initAPI } from '@/utils/api'
const currentStage = process.env.VUE_APP_STAGE ? process.env.VUE_APP_STAGE : 'develop'
initAPI(apiData, stageData, currentStage)

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(ElementUI, {
  size: 'medium'
})
const run = async () => {
  const db = await initFirebase()
  if (db === null) console.log('firebase not enable please setup')
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
run()
