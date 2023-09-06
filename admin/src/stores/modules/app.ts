import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import NProgress from 'nprogress'

interface App {
    route: string,
    routeRefreshTag: boolean,
    pageReturn: boolean
}

const useAppStore = defineStore('app', {
    state: (): App => {
        return {
            route: '',
            routeRefreshTag: true,
            pageReturn: false
        }
    },
    actions: {
        refreshRouterView() {
            this.routeRefreshTag = false
            NProgress.start()

            nextTick(() => {
                this.routeRefreshTag = true
                NProgress.done()
            })
        }
    }
})

export default useAppStore