import { setupFirebaseApp } from '@/plugins/firebase'
import { setupPWA } from '@/plugins/pwa'
import { setupStore } from '@/store'
import { setupI18n } from '@/plugins/i18n'
import { setupRouter } from '@/router'
import { setupServices } from '@/plugins/services'
import { setupErrorHandler } from '@/plugins/errorHandler'
import { setupRouterGuard } from '@/router/guard'

import App from '@/App.vue'

export async function bootstrap(test= false) {
    const app = createApp(App)

    setupErrorHandler(app)

    await setupFirebaseApp()

    await setupServices()

    // Configure routing
    const router = await setupRouter(app, test)

    // Configure store
    setupStore(app)

    // Multilingual configuration
    await setupI18n(router, app)

    app.mount(test ? document.createElement('div') : '#app')

    setupRouterGuard(router)

    await setupPWA()

    return app
}

