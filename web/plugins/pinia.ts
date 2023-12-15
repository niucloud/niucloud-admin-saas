import { createPinia } from 'pinia'

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.vueApp.use(createPinia())
})