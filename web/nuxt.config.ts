// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from 'vite'

const envScript = (process.env as any).npm_lifecycle_script.split(' ')
const envName = envScript[envScript.length - 1]
const envData = loadEnv(envName, 'env')

export default defineNuxtConfig({
    app: {
        baseURL: '/web/'
    },
    modules: [
        '@element-plus/nuxt',
        'nuxt-windicss'
    ],
    runtimeConfig: {
        public: envData
    },
    vite: {
        envDir: '~/env',
    },
    ssr: false
})
