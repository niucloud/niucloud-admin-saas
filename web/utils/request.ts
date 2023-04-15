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
    showMessageConfig?: ShowMessageConfig
}

class Http {
    private options: FetchOptions = {
        baseURL: '',
        method: '',
        headers: {}
    }

    public constructor() {
        /**
         * 全局请求拦截器
         */
        this.options.onRequest = (data) => {
            const runtimeConfig = useRuntimeConfig()

            this.options.baseURL = runtimeConfig.public.VITE_APP_BASE_URL || `${location.origin}/api/`
            this.options.headers[runtimeConfig.public.VITE_REQUEST_HEADER_SITEID_KEY] = runtimeConfig.public.VITE_SITE_ID
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

            if (data.code == 200) {
                if (options.showMessageConfig.showSuccessMessage) ElMessage({ message: data.msg, type: 'success' })
            } else {
                if (options.showMessageConfig.showErrorMessage) ElMessage({ message: data.msg, type: 'error' })
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
            useFetch(url, { ...this.options }).then((response) => {
                const { data: { value }, error } = response

                if (value) {
                    if (value.code == 200) {
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
        })
    }
}

const request = new Http()
export default request