'use strict'
const gulp = require('gulp')
const shell = require('shelljs')
const eventbus = require('../utils/eventbus')
const { addLocalEnv, getLocalEnv } = require('../utils/localenv')
// const { getAppArgs } = require('../utils/args')
// const { dist_create, dist_prepare, dev_deploy, stage_deploy, master_deploy } = require('../libs/deployJob')
const { defaultFlow, execBuild, cordova } = require('../job/flowJob')
let isDeploy = false
gulp.task('default', async () => {
  await defaultFlow()
})
// 建立可執行檔案
gulp.task('build', async () => {
  await execBuild()
})
// 單元測試
gulp.task('test', async () => {
  await shell.exec('npm run test:unit')
})
gulp.task('init', async () => {
  console.log('專案初始化')
  await addLocalEnv()
})
// 建立cordova
gulp.task('cordova', async () => {
  await cordova()
})
gulp.task('deploy', async () => {
  isDeploy = true
  await execBuild()
})
const addEventHandler = () => {
  eventbus.on('webpack-build-complete', () => {
    // const args = getAppArgs()
    if (isDeploy) {
      console.log('TODO for deploy')
    } else {
      process.exit()
    }
  })
}
addEventHandler()
// test
gulp.task('test', async () => {
  await getLocalEnv()
})
