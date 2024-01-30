import i18n, { language } from "./i18n"
import { currRoute } from '@/utils/common'
const t = (message: string) => {
    const route = currRoute()
    language.loadLocaleMessages(`/${route}`, uni.getLocale())
    const file = language.getFileKey(`/${route}`)
    const key = `${file.fileKey}.${message}`
    return i18n.global.t(key) != key ? i18n.global.t(key) : i18n.global.t(message)
}

export { language, t }

export default {
    install(app: any) {
        //注册i18n
        app.use(i18n);
    }
};


