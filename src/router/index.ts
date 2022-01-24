import {
    createRouter,
    createWebHistory
} from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { App } from 'vue'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export function setupRouter(app: App<Element>) {
    app.use(router)
}
