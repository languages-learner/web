import {
    createRouter,
    createWebHistory, RouteRecordRaw
} from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { App } from 'vue'

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

export function setupRouter(app: App<Element>) {
    app.use(router)
}
