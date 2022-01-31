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

    await setupFirebaseApp()

    // Configure store
    setupStore(app)

    // Multilingual configuration
    setupI18n(app)

    // Configure routing
    setupRouter(app)

    // router-guard
    setupRouterGuard(router)

    setupServices(app)

    setupErrorHandle(app)

    app.mount('#app')
}

bootstrap()


