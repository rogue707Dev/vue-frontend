import BaseArtClass from './BaseArtClass'
let instance = null
class ChicagoArt extends BaseArtClass {
  constructor () {
    super()
    this.name = 'ChicagoArt'
  }
  init () {
    this.seeds = [
      '6ad8f7d6-c8a9-5216-2664-09bd5691c6ed',
      'f9ae4fc0-5c4e-f15d-f9ca-71453a8de917',
      '982ba820-bbd7-8751-920e-9f411580c002',
      '665620f0-9b54-f85f-0337-cf30e3e53732',
      '9ee6ba5d-97ee-8012-2ee5-7b540a048023',
      'a40f43d6-c6ac-93e4-4044-948312fac52e',
      '0dda4c07-ba53-d3f3-7149-be2041b4962e',
      '4f09b67a-7ed6-2cca-2e5c-4b44d7f14961',
      '0ff580dc-6af2-250a-3555-38db0f6c3c4a',
      'c5f07682-c502-9712-9849-8f89af59469c',
      'be11296e-fe7c-9751-3763-b68c85150df2',
      '88d65792-afb3-c90b-56d7-6f95967fa731',
      '7c1093fb-f82c-02aa-a743-b179f26fb89a',
      '9511bf7d-4f6c-f523-5fb1-ff069c17f16c',
      '0c266d91-4d1a-9329-aa1b-6d1a64a35b15',
      '43c9a463-8b77-f51d-0108-f785961c30a2',
      '7f228009-f8de-48b6-8a16-94b48ec64471'
    ]
  }
  _fullPath (fileName) {
    return `https://www.artic.edu/iiif/2/${fileName}/full/1280,/0/default.jpg`
  }
}
if (instance === null) instance = new ChicagoArt()
export default instance
