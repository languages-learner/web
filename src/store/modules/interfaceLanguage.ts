import { defineStore } from 'pinia'
import { useConfigStore } from '@/store/modules/config'
import { useDbStore } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { getErrorMessage } from '@/utils/error'
import { useI18n } from '@/plugins/i18n'
import { TEST_INTERFACE_LANGUAGE_NAME } from '@/const/InterfaceLanguage'

export const useInterfaceLanguageStore = defineStore('interfaceLanguage', () => {
    const {
        locale,
        availableLocales,
        setLocaleMessage,
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
            setLocaleMessage(languageName, translations as never)
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.INTERFACE_LANGUAGE_STORE, message: getErrorMessage(e) })
        }
    }

    const setInterfaceLanguage = async (languageId: number) => {
        const languageName = getLanguageName(languageId)
        if ([languageName, TEST_INTERFACE_LANGUAGE_NAME].includes(unref(locale))) {
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
        setInterfaceLanguage,
    }
})
