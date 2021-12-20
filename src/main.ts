import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import i18n from '@/plugins/i18n'
import { initializeFirebaseApp } from '@/plugins/firebase'
import firestore from '@/plugins/firestore'
import App from '@/App.vue'

initializeFirebaseApp()

createApp(App)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .use(firestore)
    .mount('#app')
