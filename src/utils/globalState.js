import Cookies from 'js-cookie'
import store from 'store2'
const AppID = 'OzzySun'
const defaultSaveType = 'local' // 儲存方式 cookie|local|tmp
// common utils
export const setLocal = (key, value, saveType = null) => { // 指定savetype
  if (saveType === null) saveType = defaultSaveType
  key = getKey(key)
  switch (saveType) {
    case 'cookie':
      Cookies.set(key, value)
      break
    case 'local':
      store.set(key, value)
      break
    case 'tmp':
      if (window.__tmp__ === undefined) window.__tmp__ = {}
      window.__tmp__[key] = value
      break
  }
}
export const getLocal = (key, defaultValue = null, saveType = null) => {
  if (saveType === null) saveType = defaultSaveType
  key = getKey(key)
  let value = null
  switch (saveType) {
    case 'cookie':
      value = Cookies.get(key)
      break
    case 'local':
      value = store.get(key)
      break
    case 'tmp':
      if (window.__tmp__ === undefined) window.__tmp__ = {}
      value = window.__tmp__[key] !== undefined ? window.__tmp__[key] : null
  }
  if (value && value !== null) {
    return value
  } else {
    setLocal(key, defaultValue)
    return defaultValue
  }
}
export const removeLocal = (key, saveType = null) => {
  if (saveType === null) saveType = defaultSaveType
  key = getKey(key)
  switch (saveType) {
    case 'cookie':
      Cookies.remove(key)
      break
    case 'local':
      store.remove(key)
      break
    case 'tmp':
      if (window.__tmp__ && window.__tmp__[key]) delete window.__tmp__[key]
      break
  }
}
export const resetLocal = (saveType = null) => {
  if (saveType === null) saveType = defaultSaveType
  switch (saveType) {
    case 'cookie':
      // Cookies.remove(key)
      document.cookie.split(';').forEach(function (c) { document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/') })
      break
    case 'local':
      // store.clear()
      store.remove(getKey('token'))
      store.remove(getKey('site'))
      break
    case 'tmp':
      window.__tmp__ = {}
      break
  }
}
const getKey = (key, saveType = null) => {
  if (saveType === null) saveType = defaultSaveType
  return saveType === 'cookie' ? `${AppID}-${key}` : `${AppID}/${key}`
}
// 取得環境變數資料
export const getEnv = (key) => {
  return process.env[key]
}
