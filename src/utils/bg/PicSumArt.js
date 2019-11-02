import BaseArtClass from './BaseArtClass'
import request from '@/utils/request'
import LocalTool from '@/core/utils/LocalStorageTool'
let instance = null
class PicSumArtClass extends BaseArtClass {
  constructor () {
    super()
    this.name = 'PicSumArt'
  }
  get bg () {
    let filename = this.seeds[this.index]
    if (this._assignBg !== null) {
      filename = this._assignBg
    } else if (this._assignIndex !== null) {
      filename = this.seeds[this._assignIndex]
    }
    if (filename === undefined) filename = '107' // 當undefined 以107當預設
    console.log(`bg file name=${filename} this._assignBg=${this._assignBg} this._assignIndex=${this._assignIndex}`)
    return this._fullPath(filename)
  }
  init () {
    this.sourceUrl = 'https://picsum.photos/v2/list?page=5&limit=100' // 當source url改變後 會重新存回local storage
    this.seeds = []
    const localData = LocalTool.getLocal('bgsource')
    if (localData === null || localData.sourceUrl !== this.sourceUrl) {
      this.fetchSource(() => {
        this.index = this.getRandom(this.seeds.length)
        const newLocalData = {
          seeds: this.seeds,
          sourceUrl: this.sourceUrl
        }
        LocalTool.setLocal('bgsource', newLocalData)
      })
    } else {
      this.seeds = LocalTool.getLocal('bgsource').seeds
      this.index = this.getRandom(this.seeds.length)
    }
  }
  _fullPath (fileName) { // grayscale blur
    return this.displayMode === 'default' ? `https://picsum.photos/id/${fileName}/1024/768` : `https://picsum.photos/id/${fileName}/1024/768?${this.displayMode}`
  }
  fetchSource (callback = null) {
    console.log(`re fetch source url=${this.sourceUrl}`)
    const opts = {
      url: this.sourceUrl,
      method: 'GET'
    }
    // TODO:使用外部連結會因為response沒有result 結果會在catch拿到
    // 這部分需修改request的判斷
    request(opts).then((response) => {
      if (callback !== null) callback()
    }).catch((response) => {
      console.log(`catch...err response`)
      console.log(response)
      response.forEach(item => {
        this.seeds.push(item.id)
      })
      if (callback !== null) callback()
    })
  }
}
if (instance === null) instance = new PicSumArtClass()
export default instance
