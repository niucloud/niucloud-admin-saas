import { defineStore } from 'pinia'
import { getSiteInfo } from '@/api/system'
import { redirect } from '@/utils/common'

interface System {
	site : AnyObject | null
}

const useSystemStore = defineStore('system', {
	state: () : System => {
		return {
			site: null
		}
	},
	actions: {
		async getSitenfo() {
			await getSiteInfo()
				.then((res : any) => {
					this.site = res.data
					if (this.site.status == 3) redirect({ url: '/pages/index/close', mode: 'reLaunch' })
				})
				.catch((err) => {
					redirect({ url: '/pages/index/nonexistence', mode: 'reLaunch' })
				})
		}
	}
})

export default useSystemStore