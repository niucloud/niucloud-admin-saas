import { nextTick } from 'vue'

class Language {
    private i18n: any
    private loadLocale: Array<string> = [] //已加载的语言

    public path = ''

    constructor(i18n: any) {
        this.i18n = i18n
    }

    /**
     *
     * @param locale 设置语言
     */
    public setI18nLanguage(locale: string, path: string = '') {
        if (this.i18n.mode === 'legacy') {
            this.i18n.global.locale = locale
        } else {
            this.i18n.global.locale = locale
        }
        path && (this.path = path)
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
            // 检测当前访问的是系统（app）还是插件
            const pathArr = path.split('/')
            let route = pathArr[1] == 'app' ? pathArr[1] : pathArr[2];

            let file = path == '/' ? 'pages.index.index' : path.replace('/', '').replaceAll('/', '.')

            // 如果是系统页面，则移除“app.”
            if (route == 'app') {
                file = file.replace('app.', '')
            } else {
                file = file.replace(`addon.${route}.`, '')
            }

            // 是否已加载
            if (this.loadLocale.includes(`${file}.${locale}`)) {
                this.setI18nLanguage(locale, file)
                return nextTick()
            }
            this.loadLocale.push(`${file}.${locale}`)

            // 引入语言包文件
            const messages = await import(route == 'app' ? `../${route}/locale/${locale}/${file}.json` : `../addon/${route}/locale/${locale}/${file}.json`)
            let data: Record<string, string> = {}
            Object.keys(messages.default).forEach(key => {
                data[`${file}.${key}`] = messages.default[key]
            })
            this.i18n.global.mergeLocaleMessage(locale, data)
            this.setI18nLanguage(locale, file)

            return nextTick()
        } catch (e) {
            this.setI18nLanguage(locale)
            return nextTick()
        }
    }
}

export default Language
