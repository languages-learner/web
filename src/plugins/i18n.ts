import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import fr from '@/locales/fr.json'
import { App } from 'vue'

type MessageSchema = typeof en

export function setupI18n(app: App) {
    const i18n = createI18n<[MessageSchema], 'en' | 'ru' | 'fr'>({
        locale: 'en',
        fallbackLocale: {
            default: ['en', 'fr', 'ru'],
        },
        messages: {
            'en': en,
            'ru': ru,
            'fr': fr,
        },
        legacy: false,
        globalInjection: true
    })
    app.use(i18n)
}
