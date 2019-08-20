import Vue from 'vue'
import Router from 'vue-router'
import routesData from '@/conf/routes.yml'
import { getRouteArray } from './routesDataParser'
// import { getRouteArrayFromSchema } from './schemaRouteParser'
Vue.use(Router)
// - 初始要 載入的部分
const presetRoutes = [
]
const dataRoutes = getRouteArray(routesData)
const lastRoutes = []
const staticRouterMap = presetRoutes.concat(dataRoutes).concat(lastRoutes)
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRouterMap
})
