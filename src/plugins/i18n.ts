import {
    type Composer,
    type I18nOptions,
    type Locale,
    type LocaleMessageValue,
    type VueMessageType,
    createI18n,
} from 'vue-i18n'
import type { App } from 'vue'
import type { Router } from 'vue-router'

let i18nGlobal:  Composer<
    Record<string, Record<string, LocaleMessageValue<VueMessageType>>>,
    Record<string, I18nOptions['datetimeFormats']>,
    Record<string, I18nOptions['numberFormats']>,
    Locale
>

export const setupI18n = async (router: Router, app: App) => {
    const interfaceLanguage = router?.currentRoute.value.params.lang as string ?? BASE_INTERFACE_LANGUAGE_NAME
    window.document.querySelector('html')?.setAttribute('lang', interfaceLanguage)
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
    app?.use(i18n)
    i18nGlobal = i18n.global

    return {
        i18n,
        i18nGlobal,
    }
}

export const useI18n = () => i18nGlobal
