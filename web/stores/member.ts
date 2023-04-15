import { defineStore } from 'pinia'
import { getMemberInfo } from '@/api/member'
import { logout } from '@/api/auth'

interface Member {
    token: string | null
    info: Record<string, any> | null
}

const useMemberStore = defineStore('member', {
    state: (): Member => {
        return {
            token: useCookie('token').value,
            info: null
        }
    },
    actions: {
        async setToken(token: string) {
            this.token = token
            useCookie('token').value = token
            await this.getMemberInfo()
        },
        async getMemberInfo() {
            await getMemberInfo()
                .then((res: any) => {
                    this.info = res.data
                })
                .catch((err) => {
                    this.logout()
                })
        },
        logout() {
            logout().then(() => {
                this.$reset()
                useCookie('token').value = null
            }).catch(() => {
                this.$reset()
                useCookie('token').value = null
            })
        }
    }
})

export default useMemberStore