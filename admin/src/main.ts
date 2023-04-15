import { createApp } from 'vue'
import App from './App.vue'
import roter from './router'
import ElementPlus from 'element-plus'
import pinia from './stores'
import lang from './lang'
import '@/styles/index.scss'
import { useElementIcon } from './utils/common'

async function run() {
    const app = createApp(App)
    app.use(pinia)
    app.use(lang)
    app.use(roter)
    app.use(ElementPlus)
    useElementIcon(app)
    app.mount('#app')
}

run()
