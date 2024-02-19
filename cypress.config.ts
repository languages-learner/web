import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config()

export default defineConfig({
    chromeWebSecurity: false,
    env: {
        language: 'xx',
        mobileViewportWidthBreakpoint: 640,
        testUser: {
            username: process.env.TEST_USER_USERNAME,
            password: process.env.TEST_USER_PASSWORD,
        },
    },
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportHeight: 660,
        viewportWidth: 1000,
        defaultCommandTimeout: 10000,
        experimentalRunAllSpecs: true,
    },
})
