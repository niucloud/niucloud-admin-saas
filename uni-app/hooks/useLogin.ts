import { redirect, isWeixinBrowser } from '@/utils/common'
import { weappLogin, wechatLogin } from '@/api/auth'
import { getWechatAuthCode } from '@/api/system'
import useMemberStore from '@/stores/member'
import useConfigStore from '@/stores/config'

export function useLogin() {
    /**
     * 设置登录返回页
     */
    const setLoginBack = (data : redirectOptions) => {
        uni.setStorage({ key: 'loginBack', data })
        setTimeout(() => {
            const config = useConfigStore()
            // #ifdef MP-WEIXIN
            if (uni.getStorageSync('openid') && config.login.is_bind_mobile) {
                redirect({ url: '/pages/auth/bind' })
                return
            }
            // #endif

            // #ifdef H5
            if (isWeixinBrowser() && uni.getStorageSync('openid') && config.login.is_bind_mobile) {
                redirect({ url: '/pages/auth/bind' })
                return
            }
            // #endif
            redirect({ url: '/pages/auth/login' })
        })
    }

    /**
     * 执行登录后跳转
     */
    const handleLoginBack = () => {
        uni.getStorage({
            key: 'loginBack',
            success: (data : AnyObject) => {
                data ? redirect(data.data) : redirect({ url: '/pages/index/index' })
            },
            fail: (res) => {
                redirect({ url: '/pages/index/index' })
            }
        })
    }

    /**
     * 授权登录
     */
    const authLogin = (code : string | null) => {
        let login = null
        // #ifdef MP-WEIXIN
        login = weappLogin
        // #endif

        // #ifdef H5
        login = wechatLogin
        // #endif

        login({ code }).then((res : AnyObject) => {
            if (res.data.token) {
                useMemberStore().setToken(res.data.token)
            } else {
                uni.setStorageSync('openid', res.data.openid)
            }
        })
    }

    /**
     * 获取授权码
     */
    const getAuthCode = (scopes : 'snsapi_base' | 'snsapi_userinfo' = 'snsapi_base') => {
        // #ifdef MP-WEIXIN
        wx.login({
            success(res) {
                if (res.code) {
                    authLogin(res.code)
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
        // #endif

        // #ifdef H5
        getWechatAuthCode({
            url: `${location.origin}${location.pathname}`,
            scopes
        }).then((res : AnyObject) => {
            location.href = res.data.url
        })
        // #endif
    }

    return {
        setLoginBack,
        handleLoginBack,
        authLogin,
        getAuthCode
    }
}