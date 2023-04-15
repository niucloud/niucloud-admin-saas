import { getToken, getAppChannel } from './common'
import useMemberStore from '@/stores/member'

interface RequestConfig {
    showErrorMessage ?: boolean
    showSuccessMessage ?: boolean
}
interface RequestOptions extends UniNamespace.RequestOptions, RequestOptions { }

class Request {
    private baseUrl : string

    private config : RequestOptions = {
        url: '',
        header: {}
    }

    constructor() {
        // #ifdef H5
        this.baseUrl = import.meta.env.VITE_APP_BASE_URL || `${location.origin}/api/`
        // #endif
        // #ifndef H5
        this.baseUrl = import.meta.env.VITE_APP_BASE_URL
        // #endif

        // #ifdef MP
        this.config.header[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = import.meta.env.VITE_SITE_ID
        // #endif
        // #ifdef H5
        this.config.header[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = uni.getStorageSync('site_id') || import.meta.env.VITE_SITE_ID
        // #endif    

        this.config.header[import.meta.env.VITE_REQUEST_HEADER_CHANNEL_KEY] = getAppChannel()
    }

    /**
     * 请求拦截器
     */
    private requestInterceptors() {
        // 携带token site-id
        getToken() && (this.config.header[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken())
    }

    public get(url : string, data : AnyObject = {}, config : RequestConfig = {}) {
        Object.assign(this.config, config)
        return this.request('GET', url, data)
    }

    public post(url : string, data : AnyObject = {}, config : RequestConfig = {}) {
        Object.assign(this.config, config)
        return this.request('POST', url, data)
    }

    public put(url : string, data : AnyObject = {}, config : RequestConfig = {}) {
        Object.assign(this.config, config)
        return this.request('PUT', url, data)
    }

    public delete(url : string, config : RequestConfig = {}) {
        Object.assign(this.config, config)
        return this.request('DELETE', url)
    }

    /**
     * 发送上传请求
     */
    public upload(url : string, data : AnyObject = {}, config : RequestConfig = {}) {
        this.requestInterceptors()

        Object.assign(this.config, {
            url: this.baseUrl + url,
            ...data
        })

        return new Promise((resolve, reject) => {
            uni.uploadFile({
                ...this.config,
                success: res => {
                    const data = JSON.parse(res.data)
                    if (data.code == 200) {
                        this.config.showSuccessMessage && uni.showToast({ title: data.msg, icon: 'none' })
                        resolve(data)
                    } else {
                        this.handleAuthError(data.code)
                        this.config.showErrorMessage && uni.showToast({ title: data.msg, icon: 'none' })
                        reject(data)
                    }
                },
                fail: res => {
                    reject(res)
                }
            })
        })
    }

    /**
     * 发送请求
     */
    private request(method : string, url : string, data ?: AnyObject) {
        this.requestInterceptors()

        Object.assign(this.config, {
            url: this.baseUrl + url,
            method,
            data
        })

        return new Promise((resolve, reject) => {
            uni.request({
                ...this.config,
                success: res => {
                    const data = res.data
                    if (data.code == 200) {
                        this.config.showSuccessMessage && uni.showToast({ title: data.msg, icon: 'none' })
                        resolve(data)
                    } else {
                        this.handleAuthError(data.code)
                        this.config.showErrorMessage && uni.showToast({ title: data.msg, icon: 'none' })
                        reject(data)
                    }
                },
                fail: res => {
                    reject(res)
                }
            })
        })
    }

    private handleAuthError(code : number) {
        switch (code) {
            case 401:
                useMemberStore().logout()
                break;
        }
    }
}

export default new Request()