import useAppStore from '~/stores/app'

export function t(message: string) {
    const i18n = useNuxtApp().$getI18n()
    const path = useAppStore().route
    const file = path == '/' ? 'index' : path.replace('/', '').replaceAll('/', '.')
    const key = `${file}.${message}`
    return i18n.global.t(key) != key ? i18n.global.t(key) : i18n.global.t(message)
}