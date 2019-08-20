import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { plugin } from 'vue-function-api'
import router from './utils/router'
import App from './App.vue'
import { initFirebase } from '@/utils/firebase'
// import { apiData, routesData, stageData } from './config'
Vue.config.productionTip = false
Vue.use(plugin)
Vue.use(ElementUI, {
  size: 'medium'
})
const run = async() => {
  const db = await initFirebase()
  if (db === null) console.log('firebase not enable please setup')
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
run()
