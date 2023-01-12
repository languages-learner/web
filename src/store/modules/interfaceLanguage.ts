import { defineStore } from 'pinia'
import { useDbStore } from '@/plugins/services'
import { useI18n } from 'vue-i18n'
import { readonly, ref, unref } from 'vue'
import { useConfigStore } from '@/store/modules/config'
import { useRouter } from 'vue-router'

export const useInterfaceLanguageStore = defineStore('language', () => {
    const {
        locale,
        availableLocales,
        setLocaleMessage
    } = useI18n()
    const { translationCollection } = useDbStore()
    const { interfaceLanguages } = useConfigStore()
    const router = useRouter()

    const loadedLanguages = ref([...availableLocales])
    const interfaceLanguage = ref(locale)

    const fetchLanguage = async (language: string) => {
        const translations = await translationCollection.get(language)
        loadedLanguages.value.push(language)
        setLocaleMessage(language, translations)
    }

    const setInterfaceLanguage = async (language: string) => {
        if (unref(locale) === language) {
            return
        }

        window.document.querySelector('html')?.setAttribute('lang', language)

        if (!unref(loadedLanguages).includes(language)) {
            await fetchLanguage(language)
        }

        locale.value = language
        interfaceLanguage.value = language
        await router.replace({ params: { lang: language } })
    }

    return {
        interfaceLanguage: readonly(interfaceLanguage),
        interfaceLanguages,
        setInterfaceLanguage
    }
})
