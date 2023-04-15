import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    theme: {
        extend: {
            colors: {
                white: 'var(--el-color-white)',
                black: '#000',
                primary: {
                    DEFAULT: 'var(--el-color-primary)',
                    'light-3': 'var(--el-color-primary-light-3)',
                    'light-5': 'var(--el-color-primary-light-5)',
                    'light-7': 'var(--el-color-primary-light-7)',
                    'light-8': 'var(--el-color-primary-light-8)',
                    'light-9': 'var(--el-color-primary-light-9)',
                    'dark-2': 'var(--el-color-primary-dark-2)'
                },
                success: 'var(--el-color-success)',
                warning: 'var(--el-color-warning)',
                danger: 'var(--el-color-danger)',
                error: 'var(--el-color-error)',
                info: 'var(--el-color-info)',
                body: 'var(--el-bg-color)',
                page: 'var(--el-bg-color-page)'
            }
        }
    }
})