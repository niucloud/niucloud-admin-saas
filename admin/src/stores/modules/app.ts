import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import NProgress from 'nprogress'

interface App {
    route: string,
    routeRefrehTag: boolean,
    pageReturn: boolean
}

const useAppStore = defineStore('app', {
    state: (): App => {
        return {
            route: '',
            routeRefrehTag: true,
            pageReturn: false
        }
    },
    actions: {
        refreshRouterView() {
            this.routeRefrehTag = false
            NProgress.start()

            nextTick(() => {
                this.routeRefrehTag = true
                NProgress.done()
            })
        }
    }
})

export default useAppStore