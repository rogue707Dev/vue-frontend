// 載入外部script
export const loadScript = async(url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.setAttribute('defer', 'defer')
    if (script.readyState) { // IE
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          console.log(`load url=${url} success`)
          resolve()
        }
      }
    } else { // Others
      script.onload = () => {
        resolve()
      }
    }
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
// 載入外部的style 檔案
export const loadStyle = async(url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.setAttribute('async', 'async')
    link.href = url
    if (link.addEventListener) link.addEventListener('load', null, false)
    link.onreadystatechange = () => {
      const state = link.readyState
      if (state === 'loaded' || state === 'complete') link.onreadystatechange = null
    }
    const cssnum = document.styleSheets.length
    const ti = setInterval(() => {
      if (document.styleSheets.length > cssnum) {
        clearInterval(ti)
        resolve()
      }
    }, 10)
    document.getElementsByTagName('head')[0].appendChild(link)
  })
}
