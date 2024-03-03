/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
// https://github.com/TypeStrong/ts-node/issues/1096
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

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
            dts: './auto-generated-imports/auto-imports.d.ts',
            vueTemplate: true,
            imports: ['vue', 'vue-router', 'pinia',
                { from: '@/plugins/i18n.ts', imports: ['useI18n'] },
                { from: '@/plugins/services.ts', imports: ['useAuthenticationService', 'useDbStore', 'useConfigService'] },
            ],
            dirs: [
                './src/utils/**',
                './src/const/**',
                './src/enums/**',
                './src/store/modules',
                './src/composables/**',
            ],
            eslintrc: {
                enabled: true,
                filepath: './auto-generated-imports/.eslintrc-auto-import.json',
            },
        }),
        Components({
            dts: './auto-generated-imports/components.d.ts',
            resolvers: [NaiveUiResolver()],
        }),
        VitePWA({
            disable: !['1', 'true'].includes(process.env.VITE_PWA),
            injectRegister: null,
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
            manifest: {
                name: 'Languages Learner',
                short_name: 'LLearner',
                icons:[
                    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
                ],
                theme_color: '#18a058',
                background_color: '#ffffff',
                display: 'standalone',
            },
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
        coverage: {
            provider: 'v8',
            include: ['src'],
            exclude: [
                '**/interfaces',
                '**/types',
                '**/*types.ts',
                '**/dto',
                '**/router',
                '**/__mocks__',
                '**/*.vue',
                '**/*.d.ts',
            ],
        },
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
