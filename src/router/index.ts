import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import type { App } from 'vue'
import { landingRoutes } from '@/modules/landing/router'
import { workspaceRoutes } from '@/modules/workspace/router'

import { BASE_INTERFACE_LANGUAGE_NAME } from '@/const/InterfaceLanguage'
import { EPageName } from '@/enums/EPageName'

export const routes: RouteRecordRaw[] = [
    {
        path: '/:lang',
        children: [
            ...landingRoutes,
            ...workspaceRoutes,
        ],
    },
    // For fixing router warn in tests
    {
        path: '',
        redirect(to) {
            return { name: to.name ?? EPageName.LANDING, params: { lang: BASE_INTERFACE_LANGUAGE_NAME } }
        },
    },
]

export const createAppRouter = (test = false) => {
    return createRouter({
        history: test ? createMemoryHistory() : createWebHistory(),
        routes,
    })
}

export const setupRouter = async (app: App<Element>, test = false) => {
    const router = createAppRouter(test)

    app.use(router)

    await router.isReady()

    if (!router.currentRoute.value.params.lang) {
        await router.push({ name: router.currentRoute.value.name ?? EPageName.LANDING, params: { lang: BASE_INTERFACE_LANGUAGE_NAME } })
    }

    return router
}
