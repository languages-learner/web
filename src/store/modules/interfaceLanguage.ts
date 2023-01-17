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
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'

export const useInterfaceLanguageStore = defineStore('language', () => {
    const {
        locale,
        availableLocales,
        setLocaleMessage
    } = useI18n()
    const { translationCollection } = useDbStore()
    const { interfaceLanguages, getLanguageId, getLanguageName } = useConfigStore()
    const router = useRouter()
    const { addErrorLogInfo } = useErrorLogStore()

    const loadedLanguages = ref([...availableLocales])
    const interfaceLanguageId = ref(getLanguageId(unref(locale)))

    const fetchLanguage = async (languageId: number) => {
        try {
            const languageName = getLanguageName(languageId)
            const translations = await translationCollection.get(languageName)
            loadedLanguages.value.push(languageName)
            setLocaleMessage(languageName, translations)
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.INTERFACE_LANGUAGE_STORE, message: e.message })
        }
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
