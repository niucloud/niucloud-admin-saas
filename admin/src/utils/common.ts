import type {App} from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {useCssVar, useTitle} from '@vueuse/core'
import colorFunction from 'css-color-function'
import storage from './storage'

/**
 * 全局注册element-icon
 * @param app
 */
export function useElementIcon(app: App): void {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
}

/**
 * 设置主题色
 * @param color
 */
export function setThemeColor(color: string, mode: string = 'light'): void {
    useCssVar('--el-color-primary', null).value = color

    const colors: any = {
        dark: {
            'light-3': 'shade(20%)',
            'light-5': 'shade(30%)',
            'light-7': 'shade(50%)',
            'light-8': 'shade(60%)',
            'light-9': 'shade(70%)',
            'dark-2': 'tint(20%)'
        },
        light: {
            'dark-2': 'shade(20%)',
            'light-3': 'tint(30%)',
            'light-5': 'tint(50%)',
            'light-7': 'tint(70%)',
            'light-8': 'tint(80%)',
            'light-9': 'tint(90%)'
        }
    }

    Object.keys(colors[mode]).forEach((key) => {
        useCssVar('--el-color-primary' + '-' + key, null).value = colorFunction.convert(`color(${color} ${colors[mode][key]})`)
    })
}

/**
 * 设置网站 title
 * @param value
 */
export function setWindowTitle(value: string = ''): void {
    const title = useTitle()
    title.value = value ? value : import.meta.env.VITE_DETAULT_TITLE
}

/**
 * 获取token
 * @returns
 */
export function getToken(): null | string {
    return storage.get('token')
}

/**
 * 设置token
 * @param token
 * @returns
 */
export function setToken(token: string): void {
    storage.set({key: 'token', data: token})
}

/**
 * 移除token
 * @returns
 */
export function removeToken(): void {
    storage.remove('token')
}

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export function debounce(fn: (args?: any) => any, delay: number = 300) {
    let timer: null | number = null
    return function (...args) {
        if (timer != null) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay);
    }
}

/**
 * 判断是否是url
 * @param str
 * @returns
 */
export function isUrl(str: string): boolean {
    return str.indexOf('http://') != -1 || str.indexOf('https://') != -1
}

/**
 * 图片输出
 * @param path
 * @returns
 */
export function img(path: string): string {
    return isUrl(path) ? path : `${import.meta.env.VITE_IMG_DOMAIN || location.origin}/${path}`
}

/**
 * 获取字符串字节长度
 * @param str
 * @returns
 */
export function strByteLength(str: string = ''): number {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}

/**
 * 获取手机端域名
 */
export function getWapDomain(): string {
    if (import.meta.env.MODE == 'development') {
        return import.meta.env.VITE_WAP_DOMAIN || location.origin + '/wap';
    } else {
        return (import.meta.env.VITE_WAP_DOMAIN || location.origin + '/wap') + (storage.get('siteId') == 1 ? '' : '/s' + storage.get('siteId'));
    }
}