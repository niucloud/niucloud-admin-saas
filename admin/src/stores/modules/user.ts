import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/common'
import { login, getAuthMenus } from '@/api/auth'
import storage from '@/utils/storage'
import router from '@/router'
import { formatRouters, INDEX_ROUTE } from '@/router/routers'
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
        login(form: object) {
            return new Promise((resolve, reject) => {
                login(form)
                    .then((res) => {
                        this.token = res.data.token
                        this.userInfo = res.data.userinfo
                        setToken(res.data.token)
                        storage.set({ key: 'userinfo', data: res.data.userinfo })
                        storage.set({ key: 'siteId', data: res.data.site_id })
                        storage.set({ key: 'siteInfo', data: res.data.site_info })
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
            // 清除路由
            this.routers.forEach(item => {
                router.removeRoute(item.name)
            })
            router.removeRoute(INDEX_ROUTE.name)
            this.routers = []
            // 清除tabbar
            useTabbarStore().clearTab()
            router.push('/login')
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