import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCompositionApi from '@vue/composition-api'
import router from './utils/router'
import App from './App.vue'
import { initFirebase } from '@/utils/firebase'
// import { apiData, routesData, stageData } from './config'
Vue.config.productionTip = false
Vue.use(VueCompositionApi)
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
