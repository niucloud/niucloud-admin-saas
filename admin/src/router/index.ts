import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { STATIC_ROUTES, NO_LOGIN_ROUTES, INDEX_ROUTE, findFirstValidRoute, DECORATE_ROUTER } from './routers'
import { language } from '@/lang'
import useSystemStore from '@/stores/modules/system'
import useUserStore from '@/stores/modules/user'
import { setWindowTitle } from '@/utils/common'
import storage from '@/utils/storage'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: STATIC_ROUTES,
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    NProgress.configure({ showSpinner: false })
    NProgress.start()

    to.redirectedFrom && (to.query = to.redirectedFrom.query)

    const userStore = useUserStore()
    const siteInfo = storage.get('siteInfo') || false
    let title = (to.meta?.title || '') + (siteInfo.site_name ? ('-' + siteInfo.site_name) : '')
    // 设置网站标题
    setWindowTitle(title)
    // 加载语言包
    await language.loadLocaleMessages(to.path, useSystemStore().lang);

    // 判断是否需登录
    if (NO_LOGIN_ROUTES.includes(to.path)) {
        next()
    } else if (userStore.token) {
        // 如果已加载路由
        if (userStore.routers.length) {
            if (to.path === '/login') {
                next('/')
            } else {
                next()
            }
        } else {
            try {
                await userStore.getAuthMenus()

                // 设置首页路由
                const firstRoute = findFirstValidRoute(userStore.routers)
                INDEX_ROUTE.redirect = { name: firstRoute }
                router.addRoute(INDEX_ROUTE)

                // 添加动态路由
                userStore.routers.forEach(route => {
                    // 页面装修
                    if (route.path == DECORATE_ROUTER.path) {
                        DECORATE_ROUTER.children = route.children
                        router.addRoute(DECORATE_ROUTER)
                        return
                    }
                    if (!route.children) {
                        router.addRoute('root', route)
                        return
                    }
                    // 动态添加可访问路由表
                    router.addRoute(route)
                })

                next({ path: to.path, query: to.query, replace: true })
            } catch (err) {
                userStore.logout()
                next({ path: '/login', query: { redirect: to.fullPath } })
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.fullPath } })
        }
    }
})

// 全局后置钩子
router.afterEach(() => {
    NProgress.done()
})

export default router
