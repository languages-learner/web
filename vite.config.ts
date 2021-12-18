import { defineConfig } from 'vite'
import Pages from "vite-plugin-pages";
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue(),
        Pages({
            dirs: 'src/pages',
            exclude: ["**/components/*.vue"],
        }),
    ]
})
