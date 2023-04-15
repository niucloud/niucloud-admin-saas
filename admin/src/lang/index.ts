import i18n, { language } from "./i18n"
import useAppStore from '@/stores/modules/app'

const t = (message: string) => {
    const path = useAppStore().route
    const file = path == '/' ? 'index' : path.replace('/', '').replaceAll('/', '.')
    const key = `${file}.${message}`
    return i18n.global.t(key) != key ? i18n.global.t(key) : i18n.global.t(message)
}

export { language, t }

export default {
    install(app: any) {
        //注册i18n
        app.use(i18n);
    }
};


