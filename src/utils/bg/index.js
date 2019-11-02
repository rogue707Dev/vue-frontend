import chicagoArt from './ChicagoArt'
import defaultArt from './DefaultArt'
import picsumArt from './PicSumArt'
const artArray = [defaultArt, chicagoArt, picsumArt]
const getBgSource = (source = 'default', opt = null) => {
  let result = chicagoArt
  switch (source) {
    case 'chicago':
      result = chicagoArt
      break
    case 'picsum':
      result = picsumArt
      break
    default:
      result = defaultArt
  }
  return result
}
const randomBgSource = () => {
  const index = getRandom(artArray.length)
  return artArray[index]
}
// utils
const getRandom = (len) => {
  return Math.floor(Math.random() * len)
}
export { getBgSource, randomBgSource }
