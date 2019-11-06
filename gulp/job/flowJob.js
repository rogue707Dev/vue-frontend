
const shell = require('shelljs')
// const path = require('path')
// const { copyFile } = require('../util/tool')
const { updateLocalEnv } = require('../utils/localenv')
const { getAppArgs } = require('../utils/args')
const eventbus = require('../utils/eventbus')
const { copyFolder } = require('../utils/file')
const path = require('path')
const defaultFlow = async () => {
  process.env.useCordova = false // TODO: 確認是否有用到
  process.env.NODE_ENV = 'development'
  const args = getAppArgs()
  const propObj = { stage: args.stage }
  await updateLocalEnv(propObj)
  await shell.exec('npm run serve')
}
const cordova = async () => {
  process.env.useCordova = true
  process.env.NODE_ENV = 'production'
  const args = getAppArgs()
  const propObj = { stage: args.stage, useCordova: true }
  await updateLocalEnv(propObj)
  shell.exec('npm run build', () => {
    eventbus.emit('webpack-cordova-complete')
  })
}
const execBuild = async () => {
  process.env.useCordova = false
  process.env.NODE_ENV = 'production'
  const args = getAppArgs()
  const propObj = { stage: args.stage }
  await updateLocalEnv(propObj)
  // copy static folder to www
  const staticFrom = path.resolve('./static')
  const staticTo = path.resolve('./www/static')
  shell.exec('npm run build', async () => {
    await copyFolder(staticFrom, staticTo)
    eventbus.emit('webpack-build-complete')
  })
}
module.exports = { defaultFlow, cordova, execBuild }
