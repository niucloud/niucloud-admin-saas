import { getAppType } from './common'

interface setParam {
    key: string,
    data: any,
    success?: () => {},
    fail?: (err: any) => {}
}

class Storage {
    private prefix = ''

    public constructor() {
        this.prefix = getAppType() == 'admin' ? 'admin' : 'site'
    }

    /**
     * 设置缓存
     * @param param
     */
    public set(param: setParam) {
        try {
            window.localStorage.setItem(`${this.prefix}.${param.key}`, JSON.stringify(param.data))
            typeof param.success == 'function' && param.success()
        } catch (error) {
            typeof param.fail == 'function' && param.fail(error)
        }
    }

    /**
     * 获取缓存
     * @param key
     * @returns
     */
    public get(key: string) {
        try {
            const json: any = window.localStorage.getItem(`${this.prefix}.${key}`)
            return JSON.parse(json)
        } catch (error) {
            return window.localStorage.getItem(`${this.prefix}.${key}`)
        }
    }

    /**
     * 移除指定缓存
     * @param key
     */
    public remove(key: string | string[]) {
        if (typeof key == 'string') window.localStorage.removeItem(`${this.prefix}.${key}`)
        else key.forEach(item => { window.localStorage.removeItem(`${this.prefix}.${item}`) })
    }

    /**
     * 清理缓存
     */
    public clear() {
        window.localStorage.clear()
    }
}

const storage = new Storage()
export default storage
