import useAppStore from '~/stores/app'

export function t(message: string) {
    const i18n = useNuxtApp().$getI18n()
    let path = useAppStore().route
    // 处理部署后不知道为什么url会自动拼接上 / 的问题
    if (path != '/' && path.slice(-1) == '/') path = path.slice(0, -1)
    const file = path == '/' ? 'index' : path.replace('/', '').replaceAll('/', '.')
    const key = `${file}.${message}`
    return i18n.global.t(key) != key ? i18n.global.t(key) : i18n.global.t(message)
}