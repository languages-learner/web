/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@@': path.resolve(__dirname, '.'),
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/main.scss";',
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            // TODO Fix using auto imported enum in template
            // dirs: ['./src/enums'],
        }),
        Components({
            resolvers: [NaiveUiResolver()],
        }),
    ],
    test: {
        // https://vitest.dev/guide/common-errors#failed-to-terminate-worker
        pool: 'forks',
        setupFiles: 'vitest-setup.ts',
        typecheck: {
            enabled: true,
            ignoreSourceErrors: false,
            tsconfig: 'tsconfig.json',
        },
        environmentMatchGlobs: [
            ['tests/**/*.dom.test.{js,ts}', 'jsdom'],
            ['tests/**/*.hdom.test.{js,ts}', 'happy-dom'],
        ],
        includeSource: ['src/**/*.{js,ts}', 'tests/**/*.test.{js,ts}'],
    },
    define: {
        'import.meta.vitest': 'undefined',
    },
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true,
        },
    },
    preview: {
        host: true,
        port: 8080,
    },
})
