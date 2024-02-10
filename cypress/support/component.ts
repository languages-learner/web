/// <reference types="cypress" />

import './commands'
import { mount } from 'cypress/vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import 'firebase/compat/auth'
import { TEST_INTERFACE_LANGUAGE_NAME } from '@/const/InterfaceLanguage'
import { createAppRouter } from '@/router'

// import '@/assets/main.scss'
Cypress.Commands.add('mount', (component, options = {}) => {
    options.global = options.global || {}
    options.global.plugins = options.global.plugins || []
    options.global.plugins.push(createPinia())
    options.global.plugins.push({
        async install(app) {
            const router = createAppRouter()
            await router.push({ params: { lang: TEST_INTERFACE_LANGUAGE_NAME } })
            await router.isReady()
            app.use(createI18n({
                locale: TEST_INTERFACE_LANGUAGE_NAME,
                fallbackLocale: {
                    default: [TEST_INTERFACE_LANGUAGE_NAME],
                },
                messages: {
                    [TEST_INTERFACE_LANGUAGE_NAME]: {},
                },
                legacy: false,
                globalInjection: true,
            }))
            app.use(createPinia())
        },
    })

    return mount(component, options)
})
