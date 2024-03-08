import { createI18n } from "vue-i18n"

import Language from "./language"
import zhCn from "./zh-cn/common.json";
import en from "./en/common.json"

const addonZhCnCommon = import.meta.globEager('@/addon/**/lang/zh-cn/common.json')
const addonEnCommon = import.meta.globEager('@/addon/**/lang/en/common.json')

for (let key in addonZhCnCommon) {
    Object.assign(zhCn, addonZhCnCommon[key].default)
}
for (let key in addonEnCommon) {
    Object.assign(en, addonEnCommon[key].default)
}

//创建实例
let i18n = createI18n({
    datetimeFormats: {},
    numberFormats: {},
    globalInjection: true, //是否全局注入
    silentTranslationWarn: true,
    messages: {
        "zh-cn": zhCn,
        en
    },
    silentFallbackWarn: true
});

const language = new Language(i18n);

export { language };
export default i18n;
