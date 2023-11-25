import { createI18n } from 'vue-i18n'

import Language from './language'
import zhHans from './zh-Hans/common.json'
import en from './en/common.json'

//创建实例
let i18n = createI18n({
    locale: uni.getLocale(),
    globalInjection: true, //是否全局注入
    messages: {
        'zh-Hans': zhHans,
        en
    }
})

const language = new Language(i18n)

export { language }
export default i18n