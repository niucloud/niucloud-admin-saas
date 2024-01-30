import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, getAppType } from '@/utils/common'
import { login, logout, getAuthMenus, getSiteInfo } from '@/app/api/auth'
import storage from '@/utils/storage'
import router from '@/router'
import { formatRouters, findFirstValidRoute } from '@/router/routers'
import useTabbarStore from './tabbar'

interface User {
    token: string,
    userInfo: object,
    siteInfo: null | Record<string, any>,
    routers: any[],
    rules: any[],
    addonIndexRoute: Record<string, symbol>
}

const userStore = defineStore('user', {
    state: (): User => {
        return {
            token: getToken() || '',
            userInfo: storage.get('userinfo') || {},
            siteInfo: null,
            routers: [],
            rules: [],
            addonIndexRoute: {}
        }
    },
    actions: {
        async getSiteInfo() {
            await getSiteInfo().then(({ data }) => {
                this.siteInfo = data
                storage.set({ key: 'siteId', data: data.site_id || 0 })
                storage.set({ key: 'siteInfo', data: data })
                storage.set({ key: 'comparisonSiteIdStorage', data: data.site_id || 0 })
            }).catch(() => {

            })
        },
        login(form: object, app_type: any) {
            return new Promise((resolve, reject) => {
                login(form, app_type)
                    .then((res) => {
                        this.token = res.data.token
                        this.userInfo = res.data.userinfo
                        this.siteInfo = res.data.site_info || {}
                        setToken(res.data.token)
                        storage.set({ key: 'userinfo', data: res.data.userinfo })
                        storage.set({ key: 'siteId', data: res.data.site_id || 0 })
                        storage.set({ key: 'siteInfo', data: res.data.site_info || {} })
                        storage.set({ key: 'comparisonSiteIdStorage', data: res.data.site_id || 0 })
                        storage.set({ key: 'comparisonTokenStorage', data: res.data.token })
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        logout() {
            if (!this.token) return
            this.token = ''
            this.userInfo = {}
            this.siteInfo = {}
            removeToken()
            storage.remove(['userinfo', 'siteId', 'siteInfo'])
            this.routers = []
            logout()
            // 清除tabbar
            useTabbarStore().clearTab()
            const login = getAppType() == 'admin' ? '/admin/login' : '/site/login'
            router.push(login)
        },
        getAuthMenus() {
            return new Promise((resolve, reject) => {
                getAuthMenus({})
                    .then((res) => {
                        this.routers = formatRouters(res.data)
                        // 获取插件的首个菜单
                        this.routers.forEach((item, index) => {
                            if (item.meta.addon !== '') {
                                if (item.children && item.children.length) {
                                    this.addonIndexRoute[item.meta.addon] = findFirstValidRoute(item.children)
                                } else {
                                    this.addonIndexRoute[item.meta.addon] = item.name
                                }
                            }
                        })
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
})

export default userStore
