import BaseArtClass from './BaseArtClass'
let instance = null
class DefaultArt extends BaseArtClass {
  constructor () {
    super()
    this.name = 'DefaultArt'
  }
}
if (instance === null) instance = new DefaultArt()
export default instance
