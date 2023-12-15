import type { LocationQueryRaw } from 'vue-router'

export function useLogin() {
    /**
     * 设置登录返回页
     */
    const setLoginBack = (route: LocationQueryRaw) => {
        storage.set({
            key: 'loginBack',
            data: {
                path: route.path,
                query: route.query
            }
        })
    }

    /**
     * 执行登录后跳转
     */
    const handleLoginBack = () => {
        const data = storage.get('loginBack')
        if (data) {
            useRouter().push({ path: data.path, query: data.query })
        } else {
            useRouter().push({ path: '/' })
        }
    }

    return {
        setLoginBack,
        handleLoginBack
    }
}