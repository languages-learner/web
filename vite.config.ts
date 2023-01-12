import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@@': path.resolve(__dirname, '.'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/main";'
            }
        }
    },
    plugins: [
        vue(),
        Pages({
            pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
            exclude: ['**/components/*.vue'],
        }),
        Layouts({
            defaultLayout: 'defaultLayout',
        }),
    ]
})
