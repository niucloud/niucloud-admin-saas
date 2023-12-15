import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useCssVar, useTitle } from '@vueuse/core'
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
 * 获取当前访问应用类型
 */
export function getAppType() {
    const path = location.pathname.split('/').filter((val) => { return val })

    if (!path.length) {
        return 'admin'
    } else {
        return path[0]
    }
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
    storage.set({ key: 'token', data: token })
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
 * url 转 route
 * @param url
 */
export function urlToRouteRaw(url: string) {
    const query = {}
    const [path, param] = url.split('?')

    param && param.split('&').forEach((str: string) => {
        let [name, value] = str.split('=')
        query[name] = value
    })

    return { path, query }
}

const isArray = (value: any) => {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj: object) {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        // 原始类型直接返回
        return obj
    }
    const o = isArray(obj) ? [] : {}
    for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }
    return o
}

/**
 * 生成唯一字符
 * @param {Number} len
 * @param {Boolean} firstU
 * @param {Nubmer} radix
 */
export function guid(len = 10, firstU = true, radix = null) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    radix = radix || chars.length

    if (len) {
        // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
        for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
        let r
        // rfc4122标准要求返回的uuid中,某些位为固定的字符
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
            }
        }
    }
    // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
    if (firstU) {
        uuid.shift()
        return `u${uuid.join('')}`
    }
    return uuid.join('')
}
