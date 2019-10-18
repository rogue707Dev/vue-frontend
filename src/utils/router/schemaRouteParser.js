/* 將設定的schema 資料轉換產生route */
import Layout from '../views/layout/Layout'
import { Message } from 'element-ui'
const _import = require('./_import_' + process.env.NODE_ENV)
const defaultParentIcon = 'bell'
const defaultNodeIcon = 'form'
// -- 建立parent節點 --
const getParentNode = ({ nodeId, title = null, icon = null }) => {
  if (icon === null) icon = defaultParentIcon
  if (title === null) title = nodeId
  const node = {
    id: nodeId,
    path: `/:site/${nodeId}`,
    component: Layout,
    meta: {
      title: title,
      icon: icon
    },
    children: []
  }
  return node
}
// -- 建立子節點 如果是gen(透過template判斷)的檔案--
const getChildNode = ({ nodeId, template, name = null, icon = null, parentId = null, solution = null }) => {
  if (icon === null) icon = defaultNodeIcon
  if (name === null) name = nodeId
  // 當template 第一碼為$代表是gen出來的檔案, 代表不用樣板, 直接取用同名檔案
  let componentPath
  // gen 檔案放在_gen/${solution}/目錄下
  if (template.indexOf('$') === 0) {
    if (nodeId !== '') {
      componentPath = solution === null ? `_gen/${nodeId}/index` : `_gen/${solution}/${nodeId}/index`
    } else if (parentId !== null) {
      // 當只有一個子結點的目錄
      componentPath = solution === null ? `_gen/${parentId}/index` : `_gen/${solution}/${parentId}/index`
    } else {
      console.log('[SchemaRouteParser]ERROR!! nodeId and parentId is null ')
    }
  } else {
    // 標準使用樣板
    componentPath = `tpl/${template}`
  }
  try {
    const childNode = {
      path: nodeId,
      component: _import(componentPath), // 使用的樣板
      meta: {
        title: name,
        icon: icon
      },
      name: name
    }
    // 子項目是否隱藏:path有:直接隱藏
    if (childNode.path.indexOf(':') !== -1) {
      childNode.hidden = true
    } else {
      childNode.hidden = childNode.hidden !== null ? childNode.hidden : false
    }
    return childNode
  } catch (e) {
    console.log(e)
    Message.error(`[ERROR] ${componentPath}.vue檔案不存在 請檢查`)
    return null
  }
}
// -- 建立靜態子節點 menuid 就是檔名 static 的template 一定是'', nodeId就是實體檔案名稱, parentId就是實體目錄--
const getStaticChildNode = ({ nodeId, template = '', name = null, icon = null, parentId = null }) => {
  if (icon === null) icon = defaultNodeIcon
  if (name === null) name = nodeId
  let componentPath
  if (nodeId !== '') {
    let _pureNodeId = nodeId // 不包含/:
    if (nodeId.indexOf('/') !== -1) {
      _pureNodeId = nodeId.substr(0, nodeId.indexOf('/'))
    }
    componentPath = `pages/${parentId}/${_pureNodeId}`
  } else if (parentId !== null) {
    // 當只有一個子結點的目錄
    componentPath = `pages/${parentId}`
  }
  try {
    const childNode = {
      path: nodeId,
      component: _import(componentPath), // 使用的樣板
      meta: {
        title: name,
        icon: icon
      },
      name: name
    }
    // 子項目是否隱藏:path有:直接隱藏
    if (childNode.path.indexOf(':') !== -1) {
      childNode.hidden = true
    } else {
      childNode.hidden = childNode.hidden !== null ? childNode.hidden : false
    }
    return childNode
  } catch (e) {
    console.log(e)
    Message.error(`[ERROR] ${componentPath}.vue檔案不存在 請檢查`)
  }
}
// 輸入schemaData 取得route Data
const schema2Routedata = (schemaData, solution = null) => {
  if (schemaData.template === '') {
    return staticLinkSchema(schemaData)
  } else {
    return dbLinkSchema(schemaData, solution)
  }
}
// -- 連接db的schema menu
const dbLinkSchema = (schemaData, solution = null) => {
  let parentId, parentNode, childId, opts
  if (schemaData.parent === '') {
    // 單一根目錄節點, 一個parent只有一個子節點
    parentId = schemaData.menuid
    parentNode = getParentNode({ nodeId: parentId, title: schemaData.caption })
    childId = ''
    opts = {
      nodeId: childId,
      template: schemaData.template,
      name: schemaData.caption,
      parentId,
      solution
    }
  } else {
    parentId = schemaData.parent
    parentNode = getParentNode({ nodeId: parentId })
    childId = schemaData.menuid
    opts = {
      nodeId: childId,
      template: schemaData.template,
      name: schemaData.caption,
      parentId,
      solution
    }
  }
  if (schemaData.icon !== null) opts.icon = schemaData.icon
  const childNode = getChildNode(opts)
  if (childNode === null) {
    return null
  } else {
    return {
      parentId: parentId,
      parentNode: parentNode,
      childNode: childNode
    }
  }
}
// --只是靜態連結 --
const staticLinkSchema = (schemaData) => {
  let parentId, parentNode, childId, opts
  if (schemaData.parent === '') {
    parentId = schemaData.menuid
    parentNode = getParentNode({ nodeId: parentId, title: schemaData.caption })
    childId = ''
    opts = {
      nodeId: childId,
      template: schemaData.template,
      name: schemaData.caption,
      parentId
    }
  } else {
    parentId = schemaData.parent
    parentNode = getParentNode({ nodeId: parentId })
    childId = schemaData.menuid
    opts = {
      nodeId: childId,
      template: schemaData.template,
      name: schemaData.caption,
      parentId
    }
  }
  if (schemaData.icon !== null) opts.icon = schemaData.icon
  const childNode = getStaticChildNode(opts)
  return {
    parentId: parentId,
    parentNode: parentNode,
    childNode: childNode
  }
}
// 將schemaArray資料轉化成完整的route資料
export const getRouteArrayFromSchema = (schemaArray, solution = null) => {
  const tree = {} // 存route資料結構
  for (const schema of schemaArray) {
    if (schema.hidden) continue
    const obj = schema2Routedata(schema, solution)
    if (obj !== null) {
      let parentNode = obj.parentNode
      const childNode = obj.childNode
      // - 當 parent已存在就用原本的
      if (tree[obj.parentId]) parentNode = tree[obj.parentId]
      if (parentNode.children === null) parentNode.children = []
      if (Array.isArray(childNode)) {
        parentNode.children.concat(childNode)
      } else {
        parentNode.children.push(childNode)
      }
      tree[parentNode.id] = parentNode
    }
  }

  const result = []
  for (const prop in tree) {
    result.push(tree[prop])
  }
  return result
}
