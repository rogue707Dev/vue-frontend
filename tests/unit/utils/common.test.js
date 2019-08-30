import { loadScript, loadStyle } from '@/utils/common'
describe('[utils/common]', () => {
  beforeAll(() => {
  })
  afterAll(() => {
  })
  it('1.1 測試載入外部js loadScript', async() => {
    const jsPath = `https://code.jquery.com/jquery-3.4.1.min.js`
    const scriptId = 'myscript'
    await loadScript(jsPath, scriptId, true)
    expect(document.getElementById(scriptId).src).toBe(jsPath)
  })
  it('1.2 測試載入外部style loadStyle', async() => {
    const stylePath = `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`
    const styleId = 'mystyle'
    await loadStyle(stylePath, styleId, true)
    expect(document.getElementById(styleId).href).toBe(stylePath)
  })
})
