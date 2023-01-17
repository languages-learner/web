import { createApp } from 'vue'
import { setupFirebaseApp } from '@/plugins/firebase'
import { setupStore } from '@/store'
import { setupI18n } from '@/plugins/i18n'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupServices } from '@/plugins/services'
import { setupErrorHandle } from '@/logics/error-handle'

import App from '@/App.vue'

async function bootstrap() {
    const app = createApp(App)

    setupErrorHandle(app)

    await setupFirebaseApp()

    await setupServices()

    // Configure routing
    await setupRouter(app)

    // Configure store
    setupStore(app)

    // Multilingual configuration
    await setupI18n(router, app)

    app.mount('#app')

    // router-guard
    setupRouterGuard(router)
}

bootstrap()


