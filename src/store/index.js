import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  getters,
  modules,
  strict: false
})
export default store
