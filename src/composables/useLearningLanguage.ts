export const useLearningLanguage = () => {
    const { customData } = storeToRefs(useUserStore())
    const { getTranslatedLanguageName, languagesAvailableForLearning } = useConfigStore()
    const { updateActiveLearningLanguage } = useUserStore()

    const activeLearningLanguageId = computed(() => unref(customData)?.activeLearningLanguage ?? BASE_INTERFACE_LANGUAGE)
    const activeLearningLanguage = computed(() => ({
        id: unref(activeLearningLanguageId),
        name: getTranslatedLanguageName(unref(activeLearningLanguageId), 'full'),
        nameShort: getTranslatedLanguageName(unref(activeLearningLanguageId), 'short'),
    }))
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
        availableLearningLanguagesOptions,
        availableLearningLanguagesOptionsExceptActive,
        updateActiveLearningLanguage,
    }
}
