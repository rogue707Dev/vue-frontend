const path = require('path')
const { isFileExist, copyFolder, updateEnv } = require('./file')
const localEnvPath = path.resolve('./.env.local')
// 建立預設環境設定檔案
const addLocalEnv = async (envPath = null) => {
  if (envPath === null) envPath = localEnvPath
  // 目錄由根目錄開始算
  const source = path.resolve('./gulp/tpl/env.local.tpl')
  const isExist = await isFileExist(envPath)
  if (!isExist) {
    const result = await copyFolder(source, envPath)
    console.log(result)
  } else {
    console.log(`${source} exist`)
  }
}
// 更新 根目錄下的 env檔案
const updateLocalEnv = async ({ stage = 'develop', useCordova = false }, envPath = null) => { // propObj={stage: , useCordova}
  if (envPath === null) envPath = localEnvPath
  const updateObj = {
    VUE_APP_STAGE: stage,
    VUE_APP_USE_CORDOVA: useCordova
  }
  const result = await updateEnv(envPath, updateObj)
  return result
}
module.exports = {
  addLocalEnv,
  updateLocalEnv
}
