import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { useDbStore } from '@/plugins/services'
import { BASE_INTERFACE_LANGUAGE_NAME } from '@/const/BaseInterfaceLanguage'

export async function setupI18n(router: Router, app: App) {
    const interfaceLanguage = router.currentRoute.value.params.lang as string ?? BASE_INTERFACE_LANGUAGE_NAME
    const { translationCollection } = useDbStore()
    const translations = await translationCollection.get(interfaceLanguage)

    const i18n = createI18n({
        locale: interfaceLanguage,
        fallbackLocale: {
            default: [interfaceLanguage],
        },
        messages: {
            [interfaceLanguage]: translations,
        },
        legacy: false,
        globalInjection: true,
    })
    app.use(i18n)
}
