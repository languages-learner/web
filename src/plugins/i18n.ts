import { createI18n } from 'vue-i18n'
import { App } from 'vue'
import { useDbStore } from '@/plugins/services'
import { BASE_INTERFACE_LANGUAGE_NAME } from '@/const/BaseInterfaceLanguage'

const getInterfaceLanguageFromWindowLocation = () => {
    const { location } = window

    try {
        return location.pathname.split('/')[1]
    } catch (e) {

    }

    return BASE_INTERFACE_LANGUAGE_NAME
}

export async function setupI18n(app: App) {
    const interfaceLanguage = getInterfaceLanguageFromWindowLocation()
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
        globalInjection: true
    })
    app.use(i18n)
}
