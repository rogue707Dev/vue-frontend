class BaseArtClass {
  constructor () {
    this.name = 'BaseArtClass'
    this.index = 0
    this._displayMode = 'default'
    this._assignBg = null // 指定 圖片檔名
    this._assignIndex = null // 指定圖片index
    this.init()
  }
  get bg () {
    let filename = this.seeds[this.index]
    if (this._assignBg !== null) {
      filename = this._assignBg
    } else if (this._assignIndex !== null) {
      filename = this.seeds[this._assignIndex]
    }
    return this._fullPath(filename)
  }
  get nextBg () {
    this.index = this.index < this.seedLength - 1 ? this.index + 1 : 0
    return this.bg
  }
  get randomBg () {
    this.index = this.getRandom(this.seeds.length)
    console.log(`this.index=${this.index}`)
    return this.bg
  }
  // 設定顯示模式 目前只有picsum支援：grayscale|blur
  set displayMode (val) {
    this._displayMode = val
  }
  get displayMode () {
    return this._displayMode
  }
  // 指定bg 檔案
  set assignBg (val) {
    this._assignBg = val
  }
  get assignBg () {
    return this._assignBg
  }
  set assignIndex (val) {
    this._assignIndex = val
  }
  get assignIndex () {
    return this._assignIndex
  }
  init () {
    this.seeds = [
      'login_bg.jpg'
    ]
    this.seedLength = this.seeds.length
  }
  _fullPath (fileName) {
    return `static/${fileName}`
  }
  getRandom (len) {
    return Math.floor(Math.random() * len)
  }
}
export default BaseArtClass
