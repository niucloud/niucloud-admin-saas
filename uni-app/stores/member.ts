import { defineStore } from 'pinia'
import { setToken, removeToken, redirect } from '@/utils/common'
import { getMemberInfo } from '@/api/member'
import { logout } from '@/api/auth'

interface Member {
    token : string | null
    info : AnyObject | null
}

const useMemberStore = defineStore('member', {
    state: () : Member => {
        return {
            token: uni.getStorageSync(import.meta.env.VITE_REQUEST_STORAGE_TOKEN_KEY),
            info: null
        }
    },
    actions: {
        async setToken(token : string) {
            this.token = token
            setToken(token)
            await this.getMemberInfo()
        },
        async getMemberInfo() {
            if (!this.token) return
            await getMemberInfo()
                .then((res : any) => {
                    this.info = res.data
                })
                .catch(async () => {
                    await this.logout()
                })
        },
        async logout(isRedirect : boolean = false) {
            if (!this.token) return
            await logout().then(() => {
                this.$reset()
                removeToken()
                isRedirect && redirect({ url: '/pages/index/index' })
            }).catch(() => {
                this.$reset()
                removeToken()
                isRedirect && redirect({ url: '/pages/index/index' })
            })
        }
    }
})

export default useMemberStore