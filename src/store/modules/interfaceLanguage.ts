import { defineStore } from 'pinia'
import { useDbStore } from '@/plugins/services'
import { useI18n } from 'vue-i18n'
import {
    readonly,
    ref,
    unref
} from 'vue'
import { useConfigStore } from '@/store/modules/config'
import { useRouter } from 'vue-router'

export const useInterfaceLanguageStore = defineStore('language', () => {
    const {
        locale,
        availableLocales,
        setLocaleMessage
    } = useI18n()
    const { translationCollection } = useDbStore()
    const { interfaceLanguages, getLanguageId, getLanguageName } = useConfigStore()
    const router = useRouter()

    const loadedLanguages = ref([...availableLocales])
    const interfaceLanguageId = ref(getLanguageId(unref(locale)))

    const fetchLanguage = async (languageId: number) => {
        const languageName = getLanguageName(languageId)
        const translations = await translationCollection.get(languageName)
        loadedLanguages.value.push(languageName)
        setLocaleMessage(languageName, translations)
    }

    const setInterfaceLanguage = async (languageId: number) => {
        const languageName = getLanguageName(languageId)
        if (unref(locale) === languageName) {
            return
        }

        window.document.querySelector('html')?.setAttribute('lang', languageName)

        if (!unref(loadedLanguages).includes(languageName)) {
            await fetchLanguage(languageId)
        }

        locale.value = languageName
        interfaceLanguageId.value = languageId
        await router.replace({ params: { lang: languageName } })
    }

    return {
        interfaceLanguageId: readonly(interfaceLanguageId),
        interfaceLanguages,
        setInterfaceLanguage
    }
})
