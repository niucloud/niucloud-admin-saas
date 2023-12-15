import { createI18n } from 'vue-i18n'

import zhCn from "~/lang/zh-cn/common.json";
import en from "~/lang/en/common.json"
import zhCnPages from "~/lang/zh-cn/pages.json";
import enPages from "~/lang/en/pages.json"

export default defineNuxtPlugin((NuxtApp) => {
    const i18n = createI18n({
        globalInjection: true, //是否全局注入
        messages: {
            "zh-cn": Object.assign(zhCn, zhCnPages),
            "en": Object.assign(en, enPages)
        },
        silentFallbackWarn: true,
        silentTranslationWarn: true
    })
    NuxtApp.vueApp.use(i18n)

    return {
        provide: {
            getI18n: () => i18n
        }
    }
})