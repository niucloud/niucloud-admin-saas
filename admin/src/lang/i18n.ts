import { createI18n } from "vue-i18n"

import Language from "./language"
import zhCn from "./zh-cn/common.json";
import en from "./en/common.json"

//创建实例
let i18n = createI18n({
    datetimeFormats: {},
    numberFormats: {},
    globalInjection: true, //是否全局注入
    silentTranslationWarn: true,
    messages: {
        "zh-cn": zhCn,
        en
    }
});

const language = new Language(i18n);

export { language };
export default i18n;