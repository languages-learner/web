import { defineConfig } from 'cypress'
// https://github.com/TypeStrong/ts-node/issues/1096
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config()

export default defineConfig({
    projectId: 'fm6ypm',
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
        viewportWidth: 1100,
        defaultCommandTimeout: 25000,
        experimentalRunAllSpecs: true,
    },
})
