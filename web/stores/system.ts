import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import { getSiteInfo } from '@/app/api/system'

interface System {
    lang: string,
    site: Record<string, any>
}

const useSystemStore = defineStore('system', {
    state: (): System => {
        return {
            lang: storage.get('lang') ?? 'zh-cn',
            site: {
                front_end_name: '',
                site_name: ''
            }
        }
    },
    actions: {
        async getSitenfo() {
            await getSiteInfo()
                .then((res: any) => {
                    this.site = res.data
                    if (this.site.status == 3) navigateTo('/site/close', { replace: true })
                })
                .catch((err) => {
                    navigateTo('/site/nosite', { replace: true })
                })
        }
    }
})

export default useSystemStore
