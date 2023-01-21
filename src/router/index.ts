import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import type { App } from 'vue'
import { landingRoutes } from '@/modules/landing/router'
import { workspaceRoutes } from '@/modules/workspace/router'

import { BASE_INTERFACE_LANGUAGE_NAME } from '@/const/BaseInterfaceLanguage'
import { EPageName } from '@/enums/EPageName'

let routes = [
    ...landingRoutes,
    ...workspaceRoutes,
]

const addLangParameterToRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
    return routes.map(route => {
        route.path = `/:lang${route.path}`

        return route
    })
}

routes = addLangParameterToRoutes(routes)

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export async function setupRouter(app: App<Element>) {
    app.use(router)

    await router.isReady()

    if (!router.currentRoute.value.params.lang) {
        await router.push({ name: router.currentRoute.value.name ?? EPageName.LANDING, params: { lang: BASE_INTERFACE_LANGUAGE_NAME } })
    }
}
