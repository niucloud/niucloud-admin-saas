import axios, { HttpStatusCode } from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios'
import { getToken } from './common';
import { ElMessage } from 'element-plus'
import { t } from '@/lang'
import useUserStore from '@/stores/modules/user'
import storage from '@/utils/storage'

interface RequestConfig extends AxiosRequestConfig {
    showErrorMessage?: boolean
    showSuccessMessage?: boolean
}

interface InternalRequestConfig extends InternalAxiosRequestConfig {
    showErrorMessage?: boolean
    showSuccessMessage?: boolean
}

interface requestResponse extends AxiosResponse {
    config: InternalRequestConfig
}

class Request {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_APP_BASE_URL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;',
                'lang': storage.get('lang') ?? 'zh-cn'
            }
        });

        // 全局请求拦截器
        this.instance.interceptors.request.use(
            (config: InternalRequestConfig) => {
                // 携带token site-id
                if (getToken()) {
                    config.headers[import.meta.env.VITE_REQUEST_HEADER_TOKEN_KEY] = getToken()
                    config.headers[import.meta.env.VITE_REQUEST_HEADER_SITEID_KEY] = storage.get('siteId') || 0
                }
                return config
            },
            (err: any) => {
                return Promise.reject(err)
            }
        )

        // 全局响应拦截器
        this.instance.interceptors.response.use(
            (response: requestResponse) => {
                const res = response.data
                if (res.code != 200) {
                    this.handleAuthError(res.code)
                    if (response.config.showErrorMessage) ElMessage({ message: res.msg, type: 'error' })
                    return Promise.reject(new Error(res.msg || 'Error'))
                } else {
                    if (response.config.showSuccessMessage) ElMessage({ message: res.msg, type: 'success' })
                    return res
                }
            },
            (err: any) => {
                this.handleNetworkError(err)
                return Promise.reject(err)
            }
        )
    }

    /**
     * 发送get请求
     * @param url 
     * @param config 
     * @returns 
     */
    public get<T = any, R = AxiosResponse<T>>(url: string, config?: RequestConfig): Promise<R> {
        return this.instance.get(url, config)
    }

    /**
     * 发送get请求
     * @param url 
     * @param config 
     * @returns 
     */
    public post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig): Promise<R> {
        return this.instance.post(url, data, config)
    }

    /**
     * 发送get请求
     * @param url 
     * @param config 
     * @returns 
     */
    public put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: RequestConfig): Promise<R> {
        return this.instance.put(url, data, config)
    }

    /**
     * 发送get请求
     * @param url 
     * @param config 
     * @returns 
     */
    public delete<T = any, R = AxiosResponse<T>>(url: string, config?: RequestConfig): Promise<R> {
        return this.instance.delete(url, config)
    }

    /**
     * 处理网络请求错误
     * @param err 
     */
    private handleNetworkError(err: any) {
        let errMessage = t('axios.unknownError')
        if (err.response && err.response.status) {
            const errStatus = err.response.status
            switch (errStatus) {
                case 400:
                    errMessage = t('axios.400')
                    break
                case 401:
                    errMessage = t('axios.401')
                    break
                case 403:
                    errMessage = t('axios.403')
                    break
                case 404:
                    errMessage = t('axios.404')
                    break
                case 405:
                    errMessage = t('axios.405')
                    break
                case 408:
                    errMessage = t('axios.408')
                    break
                case 500:
                    errMessage = t('axios.500')
                    break
                case 501:
                    errMessage = t('axios.501')
                    break
                case 502:
                    errMessage = t('axios.502')
                    break
                case 503:
                    errMessage = t('axios.503')
                    break
                case 504:
                    errMessage = t('axios.504')
                    break
                case 505:
                    errMessage = t('axios.505')
                    break
            }
        }
        if (err.message.includes('timeout')) errMessage = t('axios.timeout')
        ElMessage({ message: errMessage, type: 'error' })
    }

    private handleAuthError(code: number) {
        switch (code) {
            case 401:
                useUserStore().logout()
                break;
        }
    }
}

export default new Request()