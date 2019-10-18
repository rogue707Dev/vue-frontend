'use strict'
const path = require('path')
const gulp = require('gulp')
const shell = require('shelljs')
const { isFileExist, copyFolder } = require('../utils/file')
gulp.task('default', async () => {
  await shell.exec('npm run serve')
})
// 建立可執行檔案
gulp.task('build', async () => {
  await shell.exec('npm run build')
})
// 單元測試
gulp.task('test', async () => {
  await shell.exec('npm run test:unit')
})
gulp.task('init', async () => {
  console.log('專案初始化')
  await addEnv()
})
// 建立預設環境設定檔案
const addEnv = async () => {
  // 目錄由根目錄開始算
  const source = path.resolve('./gulp/tpl/env.local.tpl')
  const target = path.resolve('./.env.local')
  const isExist = await isFileExist(target)
  if (!isExist) {
    const result = await copyFolder(source, target)
    console.log(result)
  } else {
    console.log(`${source} exist`)
  }
}
