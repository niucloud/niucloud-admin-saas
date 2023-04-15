import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, redirect } from '@/utils/common'
import { getMemberInfo } from '@/api/member'
import { logout } from '@/api/auth'

interface Member {
    token : string | null
    info : AnyObject | null
}

const useMemberStore = defineStore('member', {
    state: () : Member => {
        return {
            token: getToken(),
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
            await getMemberInfo()
                .then((res : any) => {
                    this.info = res.data
                })
                .catch(() => {
                    this.logout()
                })
        },
        logout(isRedirect : boolean = false) {
            logout().then(() => {
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