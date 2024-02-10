import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config()

export default defineConfig({
    chromeWebSecurity: false,
    component: {
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
    },
    env: {
        language: 'xx',
        testUser: {
            username: process.env.TEST_USER_USERNAME,
            password: process.env.TEST_USER_PASSWORD,
        },
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
    },
})
