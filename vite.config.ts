import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
        Components({
            resolvers: [NaiveUiResolver()]
        })
    ],
})
