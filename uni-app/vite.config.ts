import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'

const plugins = [
    uni(),
    WindiCSS({
        scan: {
            dirs: ['.'], // 当前目录下所有文件
            fileExtensions: ['vue', 'js', 'ts'] // 同时启用扫描vue/js/ts
        }
    })
]

process.env.UNI_PLATFORM == 'mp-weixin' && plugins.push(MiniProgramTailwind())

export default defineConfig({
    server: {
        host: '0.0.0.0',
        // port: 6666,
        // open:true // vite项目启动时自动打开浏览器
    },
    plugins,
    optimizeDeps: {
        include: ['dayjs']
    }
})