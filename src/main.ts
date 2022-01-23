import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import services from '@/plugins/services'
import { initializeFirebaseApp } from '@/plugins/firebase'
import firebase from 'firebase'

initializeFirebaseApp()

const app = createApp(App)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .use(services)

let mount = false

firebase.auth().onAuthStateChanged(() => {
    if (mount) return

    app.mount('#app')
    mount = true
})


