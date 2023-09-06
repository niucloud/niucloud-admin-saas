import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, getAppType } from '@/utils/common'
import { login, getAuthMenus } from '@/api/auth'
import storage from '@/utils/storage'
import router from '@/router'
import { formatRouters } from '@/router/routers'
import useTabbarStore from './tabbar'

interface User {
    token: string,
    userInfo: object,
    siteInfo: object,
    routers: any[],
    rules: any[]
}

const useSystemStore = defineStore('user', {
    state: (): User => {
        return {
            token: getToken() || '',
            userInfo: storage.get('userinfo') || {},
            siteInfo: storage.get('siteInfo') || {},
            routers: [],
            rules: []
        }
    },
    actions: {
        login(form: object, app_type: any) {
            return new Promise((resolve, reject) => {
                login(form, app_type)
                    .then((res) => {
                        this.token = res.data.token
                        this.userInfo = res.data.userinfo
                        setToken(res.data.token)
                        storage.set({ key: 'userinfo', data: res.data.userinfo })
                        storage.set({ key: 'siteId', data: res.data.site_info.site_id })
                        storage.set({ key: 'siteInfo', data: res.data.site_info })
                        storage.set({ key: 'comparisonSiteIdStorage', data: res.data.site_info.site_id })
                        storage.set({ key: 'comparisonTokenStorage', data: res.data.token })
                        storage.set({ key: 'layout', data: (res.data.layout || 'default') })
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        logout() {
            this.token = ''
            this.userInfo = {}
            this.siteInfo = {}
            removeToken()
            storage.remove(['userinfo', 'siteId', 'siteInfo'])
            this.routers = []
            // 清除tabbar
            useTabbarStore().clearTab()
            router.push(`/${getAppType()}/login`)
        },
        getAuthMenus() {
            return new Promise((resolve, reject) => {
                getAuthMenus()
                    .then((res) => {
                        this.routers = formatRouters(res.data)
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
})

export default useSystemStore