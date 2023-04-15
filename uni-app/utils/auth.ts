import { useLogin } from '@/hooks/useLogin'
import { getToken } from '@/utils/common'
import { getNeedLoginPages } from '@/utils/pages'

const loginBack = useLogin()

/**
 * 检测是否需要登录
 */
export function checkNeedLogin(route: AnyObject){
    const pages = getNeedLoginPages()
    pages.includes(route.path) && !getToken() && loginBack.setLoginBack({ url: route.path, param: route.query || {} })
}