import { nextTick } from 'vue'

class Language {
    private i18n: any
    private loadLocale: Array<string> = [] //已加载的语言

    constructor(i18n: any) {
        this.i18n = i18n
    }

    /**
     *
     * @param locale 设置语言
     */
    public setI18nLanguage(locale: string, path: string) {
        if (this.i18n.mode === 'legacy') {
            this.i18n.global.locale = locale
        } else {
            this.i18n.global.locale = locale
        }
        uni.setLocale(locale)
    }

    /**
     * 加载语言包
     * @param path
     * @param locale
     * @returns
     */
    public async loadLocaleMessages(path: string, locale: string) {
        try {
            const file = path == '/' ? 'pages.index.index' : path.replace('/', '').replaceAll('/', '.')
            // 是否已加载
            if (this.loadLocale.includes(`${locale}/${file}`)) {
                this.setI18nLanguage(locale, file)
                return nextTick()
            }
            this.loadLocale.push(`${locale}/${file}`)
            // 引入语言包文件
            const messages = await import(`./${locale}/${file}.json`)
            this.i18n.global.mergeLocaleMessage(locale, messages.default)
            this.setI18nLanguage(locale, path)
            return nextTick()
        } catch(e) {
            this.setI18nLanguage(locale, path)
            return nextTick()
        }
    }
}

export default Language
