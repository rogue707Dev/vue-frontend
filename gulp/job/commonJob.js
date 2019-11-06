const fs = require('fs')
const path = require('path')
const config = require('../config').develop
const Tool = require('../util/tool')
const jsonfile = require('jsonfile')
const add_env = (callback = null) => {
  const _initEnvFilePath = 'gulp/tpl/env.init.json'
  const _envFilePath = path.resolve(config.root, 'env.json')
  Tool.isFileExist(_envFilePath, (isExist) => {
    if (!isExist) {
      console.log('create env.json file at root')
      fs.createReadStream(_initEnvFilePath).pipe(fs.createWriteStream(_envFilePath))
    }
  })
}
const add_gen = (callback = null) => {
  const targetFile = `./src/views/_gen/index.json`
  const modules = []
  fs.readdir(`./src/views/_gen/`, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      files.forEach(file => {
        if (file.indexOf('.vue') !== -1) modules.push(file.replace('.vue', ''))
      })
      console.log(modules)
      jsonfile.writeFile(path.resolve(targetFile), modules, { spaces: 2 }, (err) => {
        if (err) {
          console.log(err)
        } else {
          if (callback !== null) callback()
        }
      })
    }
  })
}
const add_svg = (callback = null) => {
  const targetFile = `./src/icons/index.json`
  const modules = []
  fs.readdir(`./src/icons/svg/`, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      files.forEach(file => {
        if (file.indexOf('.svg') !== -1) modules.push(file.replace('.svg', ''))
      })
      // console.log(modules)
      jsonfile.writeFile(path.resolve(targetFile), modules, { spaces: 2 }, (err) => {
        if (err) {
          console.log(err)
        } else {
          if (callback !== null) callback()
        }
      })
    }
  })
}
module.exports = { add_env, add_svg, add_gen }
