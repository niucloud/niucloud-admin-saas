import useMemberStore from '@/stores/member'
import { t } from '@/locale'
import { getToken, getAppChannel, getSiteId } from './common'

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
		
        if (process.env.NODE_ENV == 'development') {
            this.config.header[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = getSiteId(uni.getStorageSync('wap_site_id') || import.meta.env.VITE_SITE_ID)
        } else {
            this.config.header[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = getSiteId(import.meta.env.VITE_SITE_ID)
        }

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
        
        const params = Object.assign(uni.$u.deepClone(this.config), {
            url: this.baseUrl + url,
            ...data
        })
        
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                ...params,
                success: res => {
                    const data = JSON.parse(res.data)
                    if (data.code == 1) {
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

        const params = Object.assign(uni.$u.deepClone(this.config), {
            url: this.baseUrl + url,
            method,
            data
        })

        return new Promise((resolve, reject) => {
            uni.request({
                ...params,
                success: res => {
                    const data = res.data
                    if (data.code == 1) {
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
                },
                complete: (res) => {
                    this.handleRequestFail(res)
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
    
    private handleRequestFail(res) {
        if (res.errMsg && res.errMsg == "request:ok") {
            if (typeof res.data == 'string') {
                uni.showToast({ icon: 'none', title: this.baseUrl + t('requestFail') })
                return
            }
        }
        if (res.errMsg == 'request:fail') {
            uni.showToast({ icon: 'none', title: this.baseUrl + t('requestFail') })
            return
        }
        if (res.errMsg && res.errMsg == 'request:fail url not in domain list') {
            uni.showToast({ icon: 'none', title: this.baseUrl + t('notInDomainList') });
            return
        }
    }
}

export default new Request()