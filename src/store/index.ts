import { createPinia } from 'pinia'
import type { App } from 'vue'

export const setupStore = (app: App<Element>) => {
    const pinia = createPinia()

    app.use(pinia)

    return pinia
}
