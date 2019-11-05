import Vue from 'vue'
import Router from 'vue-router'
import routesData from '@@/conf/routes.yml'
import { getRouteArray } from './routesDataParser'
let _import = require('./_import_' + process.env.NODE_ENV)
if (typeof _import === 'object') _import = _import._import
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
