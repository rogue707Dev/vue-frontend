import request from '@/utils/request'
import _ from 'lodash'
import { getUrlParameter } from '@/utils/common'
let apiDataBase = null // 載入的api設定資訊
let stageData = null // 主機資訊
let currentStage = null // 目前使用的主機
let apiData = null // 目前使用的apiData 資料
let apiResult = null // 組合好產生的api method

/* api method 支援多method設定, 產生的api url 為 apiName , apinameCreate, apiNameUpdate, apiNameDelete, */
// --全部 api 一起輸出
const createFlatAPI = () => {
  apiData = getBranchData(currentStage)
  console.log(`branch=${currentStage} apiData==`)
  console.log(apiData)
  const result = {}
  // 網址上傳進的api path 如果有以這個優先
  const externalApiBase = getOptUrlBase()
  for (const prop in apiData) {
    // --找對應的主機
    let baseURL = apiData[prop].host
    if (externalApiBase !== '') baseURL = externalApiBase
    const item = apiData[prop].api
    for (const apiName in item) {
      let methods = []
      if (item[apiName].method.indexOf(',') !== -1) {
        methods = item[apiName].method.trim().toLocaleUpperCase().split(',')
      } else {
        methods = [item[apiName].method.trim().toLocaleUpperCase()]
      }
      let newApiName = apiName
      methods.forEach((method) => {
        if (methods.length > 1 && method !== 'GET') {
          switch (method) {
            case 'POST':
              newApiName = `${apiName}Create`
              break
            case 'PUT':
              newApiName = `${apiName}Update`
              break
            case 'DELETE':
              newApiName = `${apiName}Delete`
              break
          }
        }
        result[newApiName] = function (...args) { // 當有參數會是 param1, param2..data
          const opts = {
            url: item[apiName].url,
            method: method
          }
          if (args.length > 0) {
            // -- 最後一個參數若非物件, 則就非data 也就是無data
            const lastArg = args[args.length - 1]
            const haveData = lastArg !== null && typeof lastArg !== 'number' && typeof lastArg !== 'string'
            if (haveData) {
              const _data = args.pop()
              if (method === 'GET') {
                opts.params = _data// 以最後一個參數當做data, 前面的參數當作api 參數
              } else {
                opts.data = _data// 以最後一個參數當做data, 前面的參數當作api 參數
              }
            }
            // 合併api url parameter
            opts.url = urlNormalize(baseURL, opts.url, args)
          } else {
            opts.url = `${baseURL}${item[newApiName].url}`
          }
          console.log('opts=')
          console.log(opts)
          return request(opts)
        }
        // 記住每支API實際URL屬性,實際可能會用到
        result[newApiName].URL = baseURL + item[apiName].url
      })
    }
  }
  return result
}
// --將parameter替代掉api url 上的:
// baseURL: http://localhost or
// _url: /global/xxx or /global/:x/:y
const urlNormalize = (baseURL, _url, params = null) => {
  // 當url 上有帶http 就不modify 直接吐回
  if (_url.indexOf('http') === -1) {
    let _frags = _url.split('/').filter(w => w !== '')
    let rIndex = 0
    if (params !== null && params !== []) {
      _frags.forEach((_item, index) => {
        if (_item.indexOf(':') !== -1) {
          _frags[index] = params[rIndex]
          rIndex++
        }
      })
      _frags = _.without(_frags, undefined)
    }
    let finalUrl = `${baseURL}/${_frags.join('/')}`
    // url最後面有'/'者保留之
    if (_url.endsWith('/')) finalUrl = `${finalUrl}/`
    return finalUrl
  } else {
    return _url
  }
}
// 取得branch api data
const getBranchData = (branch) => {
  const hostObj = stageData[branch].host // { default: 'xxx', landryPos: 'xxxx'}
  const result = {}
  for (const prop in apiDataBase) { // apiDataBase :{ bcc: {host ,api}}
    result[prop] = {}
    result[prop].api = apiDataBase[prop].api
    result[prop].host = hostObj[apiDataBase[prop].host]
  }
  return result
}
// -- 檢查網址query string上是否有設定 api path
const getOptUrlBase = (name = 'a') => {
  let externalApiBase = getUrlParameter(name)
  if (externalApiBase !== '') {
    if (externalApiBase.indexOf('http') === -1) externalApiBase = `http://${externalApiBase}`
  }
  // console.log(`externalApiBase==${externalApiBase}`)
  return externalApiBase
}
// 初始化產生api Data
export const initAPI = (apiJSONData, stageJSONData, _currentStage) => {
  apiDataBase = apiJSONData
  stageData = stageJSONData
  currentStage = _currentStage
  apiResult = createFlatAPI()
}
// 取用 api Data
export const getAPI = () => {
  if (apiResult === null) apiResult = createFlatAPI()
  return apiResult
}
// ------------ 注意!! 以下 3個還有讀到 process 可能有問題 需確認
// 取得完整api路徑 TODO :這裡還有讀到process.env.BASE_API 可能有問題
export const apiPath = (apiName, ...args) => {
  // 網址上傳進的api path 如果有以這個優先
  const externalApiBase = getOptUrlBase()
  console.log(`apiData=`)
  console.log(apiData)
  let result = ''
  for (const prop in apiData) {
    const item = apiData[prop] // { api: host:}
    for (const itemApiName in item.api) {
      if (itemApiName === apiName) {
        // --找對應的主機
        // let baseURL = process.env.API_HOST[prop] || process.env.BASE_API
        let baseURL = item.host
        if (externalApiBase !== '') baseURL = externalApiBase
        const url = item.api[itemApiName].url
        result = args.length > 0 ? urlNormalize(baseURL, url, args) : `${baseURL}${url}`
        break
      }
    }
    if (result !== '') break
  }
  return result
}
// 取得目前設定的主機位置 TODO :這裡還有讀到process.env.BASE_API 可能有問題
export const baseURL = () => {
  return apiData.default.host
}
// 取得完整URL路徑 TODO :這裡還有讀到process.env.BASE_API 可能有問題
export const getFullURL = (path) => {
  if (path.indexOf('http') === 0) return path
  if (path.indexOf('/') !== 0) path = `/${path}`
  return `${apiData.default.host}${path}`
}
export const fetchURL = async (url, method = 'GET', data = null) => {
  if (url.indexOf('http') === -1) url = `http://${url}`
  method = method.toUpperCase()
  const opts = { url, method }
  if (data !== null) {
    if (method === 'GET') {
      opts.params = data
    } else {
      opts.data = data
    }
  }
  return new Promise((resolve, reject) => {
    request(opts).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
