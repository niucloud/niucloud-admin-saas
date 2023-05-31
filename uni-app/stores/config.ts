import { defineStore } from 'pinia'
import { getConfig } from '@/api/auth'
import { getTabbarInfo } from '@/api/diy'
import { AnyObject } from 'windicss/types/interfaces'

interface loginConfig {
    is_username: number | boolean,
    is_mobile: number | boolean,
    is_auth_register: number | boolean,
    is_bind_mobile: number | boolean,
    agreement_show: number | boolean
}

interface tabbarConfig {
    backgroundColor: string,
    textColor: string,
    textHoverColor: string,
    list: AnyObject[]
}

interface Config {
    login: loginConfig,
    tabbar: tabbarConfig | null
}


const useConfigStore = defineStore('config', {
    state: (): Config => {
        return {
            login: {
                is_username: 0,
                is_mobile: 0,
                is_auth_register: 0,
                is_bind_mobile: 0,
                agreement_show: 0
            },
            tabbar: null
        }
    },
    actions: {
        async getLoginConfig() {
            await getConfig().then((res: responseResult)=>{
                this.login.is_username = parseInt(res.data.is_username)
                this.login.is_mobile = parseInt(res.data.is_mobile)
                this.login.is_auth_register = parseInt(res.data.is_auth_register)
                this.login.is_bind_mobile = parseInt(res.data.is_bind_mobile)
                this.login.agreement_show = parseInt(res.data.agreement_show)
            }).catch(() => { 
                
            })
        },
        async getTabbarConfig() {
            await getTabbarInfo().then((res: responseResult) => {
                this.tabbar = res.data
            }).catch(() => { 
                
            })
        }
    }
})

export default useConfigStore