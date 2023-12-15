import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

interface Tabbar {
    curr: string,
    tabs: {
        [key: string]: any
    }
}

const useTabbarStore = defineStore('tabbar', {
    state: (): Tabbar => {
        return {
            curr: '',
            tabs: {}
        }
    },
    actions: {
        addTab(roter: RouteLocationNormalizedLoaded) {
            if (roter.meta && roter.meta.type != 1) return
            if (this.tabs[roter.path]) {
                this.tabs[roter.path].query = roter.query || {}
                return
            }
            this.tabs[roter.path] = {
                path: roter.path,
                title: roter.meta ? roter.meta.title : '',
                name: roter.name,
                query: roter.query || {}
            }
        },
        removeTab(path: string) {
            delete this.tabs[path]
        },
        clearTab() {
            this.tabs = {}
        }
    },
    getters: {
        tabLength: (state) => Object.keys(state.tabs).length,
        tabNames: (state) => {
            const name: any[] = []
            Object.keys(state.tabs).forEach(key => {
                name.push(state.tabs[key].name)
            })
            return name
        }
    }
})

export default useTabbarStore