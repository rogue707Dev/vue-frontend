// 載入外部script
export const loadScript = async (url, id = null, testMode = false) => {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      if (id !== null) script.id = id
      script.type = 'text/javascript'
      script.setAttribute('defer', 'defer')
      if (script.readyState) { // IE
        script.onreadystatechange = () => {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null
            console.log(`load url=${url} success`)
            resolve('loaded')
          }
        }
      } else { // Others
        script.onload = () => {
          resolve()
        }
      }
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)
      if (testMode) resolve()
    } catch (e) {
      reject(e)
    }
  })
}
// 載入外部的style 檔案
export const loadStyle = async (url, id = null, testMode = false) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.setAttribute('async', 'async')
    link.href = url
    if (id !== null) link.id = id
    if (link.addEventListener) link.addEventListener('load', null, false)
    link.onreadystatechange = () => {
      const state = link.readyState
      if (state === 'loaded' || state === 'complete') link.onreadystatechange = null
    }
    const cssnum = document.styleSheets.length
    const ti = setInterval(() => {
      if (document.styleSheets.length > cssnum) {
        clearInterval(ti)
        resolve(link)
      }
    }, 10)
    document.getElementsByTagName('head')[0].appendChild(link)
    if (testMode) resolve(link)
  })
}
// 暫存
export const tmp = (key, value = null) => { // 有value為set 沒有為get
  if (window.__tmp__ === undefined) window.__tmp__ = {}
  if (value !== null) {
    window.__tmp__[key] = value
  } else {
    return window.__tmp__[key] !== undefined ? window.__tmp__[key] : null
  }
}
export const removeTmp = (key) => {
  if (window.__tmp__ && window.__tmp__[key]) delete window.__tmp__[key]
}
// 在url search string 內查 name 的值
export const getUrlParameter = (name) => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
