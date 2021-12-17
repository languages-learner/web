import { createApp } from 'vue'
import { createPinia } from 'pinia';
import i18n from '@/plugins/i18n';
import App from './App.vue'

createApp(App)
    .use(createPinia())
    .use(i18n)
    .mount('#app')
