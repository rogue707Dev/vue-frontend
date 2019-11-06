const { argv } = require('yargs')
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./.tmp')
let tmpStage = null
// 設定臨時 stage
const setStage = (stage) => {
  tmpStage = stage
}
// 透過 --develop 或 --master --stage
const getStage = () => {
  let stage = 'develop'
  if (tmpStage !== null) {
    stage = tmpStage
  } else {
    if (argv.master) {
      stage = 'master'
    } else if (argv.stage) {
      stage = 'stage'
    } else if (argv.local) {
      stage = 'local'
    }
  }
  tmpStage = null
  return stage
}
// 由指令取得參數
const getAppArgs = () => {
  const site = argv.site || argv.s || null
  // const host = argv.host || argv.h || 'rd'
  const platform = argv.platform || argv.p || 'android' // android | ios
  const action = argv.action || argv.a || 'prepare' // prepare | build
  const version = argv.version || argv.v || 'debug' // debug| release
  const stage = getStage()
  const result = { site, platform, action, stage, version }
  localStorage.setItem('args', JSON.stringify(result))
  return result
}
// 取得儲存在local 的 args 設定
const getLocalAppArgs = () => {
  const result = localStorage.getItem('args')
  return result !== null ? JSON.parse(result) : null
}
module.exports = {
  getAppArgs, getLocalAppArgs, setStage
}
