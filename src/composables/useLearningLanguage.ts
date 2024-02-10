import { useUserStore } from '@/store/modules/user'
import { BASE_INTERFACE_LANGUAGE } from '@/const/InterfaceLanguage'
import { useConfigStore } from '@/store/modules/config'

export const useLearningLanguage = () => {
    const { customData } = storeToRefs(useUserStore())
    const { getTranslatedLanguageName, languagesAvailableForLearning } = useConfigStore()
    const { updateActiveLearningLanguage } = useUserStore()

    const activeLearningLanguage = computed(() => unref(customData)?.activeLearningLanguage)
    const activeLearningLanguageName = computed(() => getTranslatedLanguageName(unref(activeLearningLanguage) ?? BASE_INTERFACE_LANGUAGE))
    const availableLearningLanguagesOptions = computed(() =>
        languagesAvailableForLearning
            .map(languageId => ({
                key: languageId,
                label: getTranslatedLanguageName(languageId),
            })))
    const availableLearningLanguagesOptionsExceptActive = computed(() =>
        unref(availableLearningLanguagesOptions).filter(({ key }) => key !== unref(customData)?.activeLearningLanguage),
    )

    return {
        activeLearningLanguage,
        activeLearningLanguageName,
        availableLearningLanguagesOptions,
        availableLearningLanguagesOptionsExceptActive,
        updateActiveLearningLanguage,
    }
}
