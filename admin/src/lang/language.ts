import { nextTick } from 'vue'

class Language {
    private i18n: any;
    private loadLocale: Array<string> = []; //已加载的语言

    constructor(i18n: any) {
        this.i18n = i18n
    }

    /**
     *
     * @param locale 设置语言
     */
    public setI18nLanguage(locale: string) {
        if (this.i18n.mode === 'legacy') {
            this.i18n.global.locale = locale
        } else {
            this.i18n.global.locale = locale
        }
        let html = document.querySelector('html')
        html && html.setAttribute('lang', locale)
    }

    /**
     * 加载语言包
     * @param path
     * @param locale
     * @returns
     */
    public async loadLocaleMessages(app: string, path: string, locale: string) {
        try {
            const file = path == '/' ? 'index' : path.replace(/^(\/admin\/|\/site\/|\/)/, '').replaceAll('/', '.')

            // 引入语言包文件
            const messages = await import(app ? `@/addon/${app}/lang/${locale}/${file}.json` : `@/app/lang/${locale}/${file}.json`)

            let data: Record<string, string> = {}
            Object.keys(messages.default).forEach(key => {
                data[`${file}.${key}`] = messages.default[key]
            })

            // 查询插件的公共语言包
            if (app) {
                try {
                    var messagesCommon = await import( `@/${app}/lang/${locale}/common.json`)
                    Object.keys(messagesCommon.default).forEach(key => {
                        data[`${file}.${key}`] = messagesCommon.default[key]
                    })
                } catch (e) {
                    // console.log('未找到插件公共语言包')
                }
            }

            this.i18n.global.mergeLocaleMessage(locale, data)
            this.setI18nLanguage(locale)
            return nextTick()
        } catch (e) {
            this.setI18nLanguage(locale)
            return nextTick()
        }
    }
}

export default Language
