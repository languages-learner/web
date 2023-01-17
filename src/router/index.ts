import {
    RouteRecordRaw,
    createRouter,
    createWebHistory
} from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { App } from 'vue'
import { BASE_INTERFACE_LANGUAGE_NAME } from '@/const/BaseInterfaceLanguage'

let routes = setupLayouts(generatedRoutes)

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
        await router.push({ name: router.currentRoute.value.name ?? 'index', params: { lang: BASE_INTERFACE_LANGUAGE_NAME } })
    }
}
