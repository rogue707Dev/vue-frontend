/* 將route設定檔 轉換產生route */
import Layout from '@/views/layout/defaultLayout'
const _import = require('./_import_' + process.env.NODE_ENV)
// -- 建立parent節點 --
const getParentNode = (routeData) => {
  if (routeData.name === undefined) {
    const nodeId = routeData.path.indexOf('/') === 0 ? routeData.path.substr(1, routeData.path.length) : routeData.path
    routeData.name = nodeId
  }
  const node = {
    id: routeData.name,
    path: routeData.path,
    meta: {
      title: routeData.name,
      icon: routeData.icon
    },
    children: []
  }
  // 設定component
  if (routeData.component === undefined || routeData.component.toLowerCase() === 'layout') {
    node.component = Layout
  } else {
    if (routeData.component.indexOf('/') === -1) routeData.component = `${routeData.component}/index`
    node.component = _import(`${routeData.component}`)
  }
  if (routeData.hidden !== undefined) node.hidden = routeData.hidden
  if (routeData.redirect !== undefined) node.redirect = routeData.redirect
  return node
}
// -- 建立子節點 --
const getChildNode = (childRouteData) => {
  const componentPath = childRouteData.component.indexOf('/') === -1 ? `${childRouteData.component}/index` : childRouteData.component
  const childNode = {
    path: childRouteData.path,
    component: _import(componentPath)
  }
  // -- option 非必要項目 ----
  if (childRouteData.name !== undefined) childNode.name = childRouteData.name
  if (childRouteData.icon !== undefined) {
    childNode.meta = {
      title: childRouteData.name,
      icon: childRouteData.icon
    }
  }
  // 子項目是否隱藏:path有:直接隱藏
  if (childRouteData.path.indexOf(':') !== -1) {
    childNode.hidden = true
  } else {
    childNode.hidden = childRouteData.hidden !== undefined ? childRouteData.hidden : false
  }
  return childNode
}
// 將schemaArray資料轉化成完整的route資料
export const getRouteArray = (routeData) => {
  const tree = []
  routeData.forEach(item => {
    if (item.enabled) {
      const parentNode = getParentNode(item)
      if (item.children !== undefined) {
        item.children.forEach(childItem => {
          parentNode.children.push(getChildNode(childItem))
        })
      }
      tree.push(parentNode)
    }
  })
  return tree
}
