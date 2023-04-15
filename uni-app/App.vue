<script setup lang="ts">
    import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
    import { redirectInterceptor, launchInterceptor } from '@/utils/interceptor'
    import { getToken, isWeixinBrowser } from '@/utils/common'
    import useMemberStore from '@/stores/member'
    import useConfigStore from '@/stores/config'
    import { useLogin } from '@/hooks/useLogin'

    // #ifdef H5
    if (import.meta.env.VITE_APP_DEBUG) { new window.VConsole() }
    // #endif

    onLaunch(async (data) => {
        // 添加初始化拦截器
        launchInterceptor()
        // 添加页面跳转拦截器
        redirectInterceptor()

        const configStore = useConfigStore()
        configStore.getTabbarConfig()
        await configStore.getLoginConfig()

        // 隐藏tabbar
        uni.hideTabBar()

        // #ifdef H5
        uni.getSystemInfoSync().platform == 'ios' && (uni.setStorageSync('initUrl', location.href))
        // #endif

        // 判断是否已登录
        if (getToken()) {
            const memberStore = useMemberStore()
            await memberStore.setToken(getToken())
        }
        if (!getToken()) {
            const login = useLogin()
            // 三方平台自动登录
            // #ifdef MP
            login.getAuthCode()
            // #endif
            // #ifdef H5
            if (isWeixinBrowser()) {
                data.query.code ? login.authLogin(data.query.code) : login.getAuthCode()
            }
            // #endif
        }
    })

    onShow(() => {

    })

    onHide(() => {
    })
</script>

<style></style>