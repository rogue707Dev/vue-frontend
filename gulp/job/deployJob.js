'use strict'
const shell = require('shelljs')
const path = require('path')
const config = require('../config').deploy
const moment = require('moment')
const tool = require('../util/tool')
const got = require('got')
const { copyFolder } = require('../util/common')
const cloneUrl = `http://rd.jabezpos.com:82/GitRepo/${config.distGitName}.git`
const distDest = path.resolve(config.distDest)
const distFrom = path.resolve('./www')
// 複製 www 到 dist 並 更新git
const dist_prepare = (callback = null) => {
  console.log('dist-prepare step 1 run dist_reset')
  dist_reset(() => {
    console.log('step 2 run copy2dist')
    copy2dist(() => {
      console.log('step 3 run dist_prepare')
      dist_git_commit(() => {
        console.log('step 4 run complete')
        if (callback !== null) callback()
      })
    })
  })
}
const dist_git_clone = (callback = null) => {
  shell.cd(path.resolve(config.distRoot))
  shell.exec(`git clone ${cloneUrl}`, () => {
    if (callback !== null) callback()
  })
}
const dist_git_commit = (callback = null) => {
  console.log(`prepare =${config.distDest}=${distDest}`)
  shell.cd(distDest)
  shell.exec('git add .', () => {
    shell.exec(`git commit -m "auto deploy ' ${moment().format('YYYY/MM/DD HH:mm')}'"`, () => {
      shell.exec('git push origin master', () => {
        if (callback !== null) callback()
      })
    })
  })
}
const dist_reset = (callback = null) => {
  console.log(`reset =${config.distDest}=${distDest}`)
  shell.cd(distDest)
  shell.exec('git reset --hard HEAD', () => {
    shell.exec('git pull origin master --rebase', () => {
      if (callback !== null) callback()
    })
  })
}
const copy2dist = (callback = null) => {
  console.log(`copy from=${distFrom} targetPath=${distDest}`)
  copyFolder(distFrom, distDest, () => {
    if (callback !== null) callback()
  })
}
// -- 建立 DIST project
const dist_create = (callback = null) => {
  checkRootFolder((boolean) => {
    if (boolean) {
      tool.isFileExist(config.distDest, (_boolean) => {
        if (_boolean) {
          console.log('目錄已存在!!請直接執行 gulp dev-deploy')
        } else {
          dist_git_clone(callback)
        }
      })
    } else {
      dist_git_clone(callback)
    }
  })
}
// -- 檢查root 目錄是否存在
const checkRootFolder = (callback = null) => {
  tool.isFileExist(config.distRoot, (boolean) => {
    if (boolean) {
      if (callback !== null) callback(true)
    } else {
      tool.addFolder(config.distRoot, callback)
    }
  })
}

// -- deploy to server
const dev_deploy = async() => {
  console.log('start run dev deploy')
  try {
    for (let i = 0; i < config.dev.length; i++) {
      const deployCmdUrl = `http://${config.dev[i]}/service/git/pull/${config.distGitName}/master`
      console.log(`start deploy dev to=${deployCmdUrl}`)
      const response = await got(deployCmdUrl)
      console.log(response.body)
    }
    console.log('*********deploy develop complete !!******')
    process.exit()
  } catch (e) {
    console.log(`deploy error!!`)
    console.log(e)
    process.exit()
  }
}
const stage_deploy = async() => {
  try {
    for (let i = 0; i < config.stage.length; i++) {
      const deployCmdUrl = `http://${config.stage[i]}/service/git/pull/${config.distGitName}/master`
      console.log(`start deploy stage to=${deployCmdUrl}`)
      const response = await got(deployCmdUrl)
      console.log(response.body)
    }
    console.log('*********deploy stage complete !!******')
    process.exit()
  } catch (e) {
    console.log(`deploy error!!`)
    console.log(e)
    process.exit()
  }
}
const master_deploy = async() => {
  try {
    for (let i = 0; i < config.master.length; i++) {
      const deployCmdUrl = `http://${config.master[i]}/service/git/pull/${config.distGitName}/master`
      console.log(`start deploy master to=${deployCmdUrl}`)
      const response = await got(deployCmdUrl)
      console.log(response.body)
    }
    console.log('*********deploy master complete !!******')
    process.exit()
  } catch (e) {
    console.log(`deploy error!!`)
    console.log(e)
    process.exit()
  }
}
module.exports = { dist_create, dist_prepare, dev_deploy, stage_deploy, master_deploy }
