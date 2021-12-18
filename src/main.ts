import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia';
import i18n from '@/plugins/i18n';
import App from '@/App.vue'

createApp(App)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .mount('#app')
