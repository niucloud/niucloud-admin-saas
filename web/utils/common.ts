import useMemberStores from '@/stores/member'

/**
 * 获取token
 * @returns
 */
export function getToken(): null | string {
    return useMemberStores().token
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
    const runtimeConfig = useRuntimeConfig()
    return isUrl(path) ? path : `${runtimeConfig.public.VITE_IMG_DOMAIN || location.origin}/${path}`
}