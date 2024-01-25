import i18n, { language } from "./i18n"

const t = (message: string) => {
    const key = `${language.path}.${message}`
    return i18n.global.t(key) != key ? i18n.global.t(key) : i18n.global.t(message)
}

export { language, t }

export default {
    install(app: any) {
        //注册i18n
        app.use(i18n);
    }
};


