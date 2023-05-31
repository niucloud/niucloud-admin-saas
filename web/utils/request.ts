import { breakpointsTailwind } from '@vueuse/core'
import { ElMessage } from 'element-plus'

interface ShowMessageConfig {
    showErrorMessage?: boolean
    showSuccessMessage?: boolean
}

interface FetchOptions {
    baseURL: string
    method: string
    query?: Record<string, any>,
    body?: RequestInit['body'] | Record<string, any>
    headers: Record<string, any>,
    onRequest?: (data: any) => void,
    onResponse?: (data: any) => void,
    onResponseError?: (data: any) => void,
    showMessageConfig?: ShowMessageConfig,
    watch: boolean
}

class Http {
    private options: FetchOptions = {
        baseURL: '',
        method: '',
        headers: {},
        watch: false
    }

    public constructor() {
        /**
         * 全局请求拦截器
         */
        this.options.onRequest = (data) => {
            const runtimeConfig = useRuntimeConfig()

            this.options.baseURL = runtimeConfig.public.VITE_APP_BASE_URL || `${location.origin}/api/`
            this.options.headers[runtimeConfig.public.VITE_REQUEST_HEADER_SITEID_KEY] = useCookie('siteId').value || runtimeConfig.public.VITE_SITE_ID
            this.options.headers[runtimeConfig.public.VITE_REQUEST_HEADER_CHANNEL_KEY] = 'pc'
            if (getToken()) this.options.headers[runtimeConfig.public.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()

            delete this.options.body
            delete this.options.query
        }

        /**
         * 全局响应拦截器
         */
        this.options.onResponse = ({ response, options }) => {
            const { _data: data } = response
            this.handleNetworkError(response)
            if (data.code != undefined) {
                if (data.code == 1) {
                    if (options.showMessageConfig.showSuccessMessage) ElMessage({ message: data.msg, type: 'success' })
                } else {
                    ElMessage({ message: data.msg, type: 'error' })
                }
            }
        }
    }

    public get(url: string, query = {}, showMessageConfig: ShowMessageConfig = {}) {
        this.options.query = query
        return this.request(url, 'GET', showMessageConfig)
    }

    public post(url: string, body = {}, showMessageConfig: ShowMessageConfig = {}) {
        this.options.body = body
        return this.request(url, 'POST', showMessageConfig)
    }

    public put(url: string, body = {}, showMessageConfig: ShowMessageConfig = {}) {
        this.options.body = body
        return this.request(url, 'PUT', showMessageConfig)
    }

    public delete(url: string, showMessageConfig: ShowMessageConfig = {}) {
        return this.request(url, 'DELETE', showMessageConfig)
    }

    /**
     * 发送请求
     * @param url 
     * @param method 
     * @param showMessageConfig 
     * @returns 
     */
    private request(url: string, method: string, showMessageConfig: ShowMessageConfig = {}) {
        this.options.method = method
        this.options.showMessageConfig = showMessageConfig

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 处理首次请求baseurl空的问题
                const runtimeConfig = useRuntimeConfig()
                !this.options.baseURL && (this.options.baseURL = runtimeConfig.public.VITE_APP_BASE_URL || `${location.origin}/api/`)

                useFetch(url, { ...this.options }).then((response) => {
                    const { data: { value }, error } = response

                    if (value) {
                        if (value.code == 1) {
                            resolve(value)
                        } else {
                            reject(value)
                        }
                    } else {
                        reject(error)
                    }
                }).catch(err => {
                    reject(err)
                })
            }, this.options.baseURL ? 0 : 500);
        })
    }

    private handleNetworkError(err: any) {
        if (err.status && err.status != 200) {
            let errMessage = ''
            switch (err.status) {
                case 400:
                    errMessage = t('request.400')
                    break
                case 401:
                    errMessage = t('request.401')
                    break
                case 403:
                    errMessage = t('request.403')
                    break
                case 404:
                    errMessage = err.url + t('request.404')
                    break
                case 405:
                    errMessage = t('request.405')
                    break
                case 408:
                    errMessage = t('request.408')
                    break
                case 409:
                    errMessage = t('request.409')
                    break
                case 500:
                    errMessage = t('request.500')
                    break
                case 501:
                    errMessage = t('request.501')
                    break
                case 502:
                    errMessage = t('request.502')
                    break
                case 503:
                    errMessage = t('request.503')
                    break
                case 504:
                    errMessage = t('request.504')
                    break
                case 505:
                    errMessage = t('request.505')
                    break
            }
            ElMessage({ message: errMessage, type: 'error' })
        }
    }
}

const request = new Http()
export default request