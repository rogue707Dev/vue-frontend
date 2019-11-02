import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLocal } from '@/utils/globalState'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-TW'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
const i18n = new VueI18n({
  locale: getLocal('language', 'en'), // 預設使用en
  silentTranslationWarn: true,
  messages
})

export default i18n
