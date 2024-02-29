import { useElementVisibility, useToggle } from '@vueuse/core/index'
import { createInjectionState } from '@vueuse/core'
import { useNotification } from 'naive-ui'
import { useWordsFilters } from '@/modules/workspace/modules/words/composables/useWordsFilters'
import { useWordsList } from '@/modules/workspace/modules/words/composables/useWordsList'

export enum EWordsContainerState {
    // Loading words when hasn't words
    LOADING_WORDS,
    // Loading words when has words
    LOADING_ADDITIONAL_WORDS,

    // Has at least one word
    LOADED_WITH_WORDS,
    // There are no words
    LOADED_WITHOUT_WORDS,

    // Not found word with filtered text and status
    NOT_FOUND_WORD,

    // Not found word with filtered text
    FOUND_WORD_WITH_OTHER_STATUS,
    // Not found word with text similar to filtered
    FOUND_WORDS_WITH_OTHER_STATUSES,

    // In process of adding word by user
    ADDING_WORD
}

const [useProvideWordsContainerStore, baseUseWordsContainerStore] = createInjectionState(() => {
    const { t } = useI18n()
    const notification = useNotification()
    const {
        wordsFilters,
        resetWordsFilters,
    } = useWordsFilters()
    const {
        words,
        wordsWithoutStatusFilter,
        isWordsLoaded,
        isWordsLoading,
        selectedWords,
        isAllWordsSelected,
        toggleWordSelection,
        toggleAllWordsSelection,
        addWord: baseAddWord,
        deleteWord,
        updateWordTranslations,
        updateWordStatus,
        fetchWords,
        resetAndFetchWords,
    } = useWordsList(wordsFilters)
    const { customData } = storeToRefs(useUserStore())

    const [isAddWordBlockNeededByUserRequest, toggleIsAddWordBlockNeeded] = useToggle()
    watch(wordsFilters, () => {
        isAddWordBlockNeededByUserRequest.value = false
    })

    const wordsContainerState = computed<EWordsContainerState[]>(() => {
        const result = []
        const isWordFounded = unref(words).get(wordsFilters.formattedText)
        const isHasWords = unref(words).size > 0

        if (unref(isAddWordBlockNeededByUserRequest))
            result.push(EWordsContainerState.ADDING_WORD)

        if (unref(isWordsLoading)) {
            result.push(EWordsContainerState.LOADING_WORDS)
            if (isHasWords)
                result.push(EWordsContainerState.LOADING_ADDITIONAL_WORDS)
        }

        if (unref(isWordsLoaded)) {
            if (isHasWords)
                result.push(EWordsContainerState.LOADED_WITH_WORDS)
            else
                result.push(EWordsContainerState.LOADED_WITHOUT_WORDS)

            if (Boolean(wordsFilters.formattedText)) {
                const isWordWithOtherStatusFounded = unref(wordsWithoutStatusFilter).get(wordsFilters.formattedText)

                if (!isWordFounded)
                    result.push(EWordsContainerState.NOT_FOUND_WORD)

                if (unref(wordsWithoutStatusFilter).size > 0)
                    result.push(EWordsContainerState.FOUND_WORDS_WITH_OTHER_STATUSES)

                if (isWordWithOtherStatusFounded)
                    result.push(EWordsContainerState.FOUND_WORD_WITH_OTHER_STATUS)
            }
        }

        return result
    })
    const isWordsContainerState = (state: EWordsContainerState | EWordsContainerState[]) => {
        if (state instanceof Array)
            return unref(wordsContainerState).some(currentState => state.includes(currentState))

        return unref(wordsContainerState).includes(state)
    }

    const addWord = async (newTranslations: string[]) => {
        if (!await baseAddWord(wordsFilters.formattedText, newTranslations)) {
            notification.error({
                content: t('error_occurred_while_adding_word'),
                duration: 1500,
                keepAliveOnHover: true,
            })

            return false
        }

        notification.success({
            content: t('word_added_successfully'),
            duration: 1500,
            keepAliveOnHover: true,
        })

        resetWordsFilters()
        isAddWordBlockNeededByUserRequest.value = false

        return true
    }

    const bottom = ref()
    const isBottomReached = useElementVisibility(bottom)
    watch([isBottomReached, isWordsLoading], async () => {
        if (unref(isBottomReached) && !unref(isWordsLoading)) {
            await fetchWords()
        }
    })

    watch(() => unref(customData)?.activeLearningLanguage, async () => {
        resetWordsFilters()
        await resetAndFetchWords()
    })

    return {
        wordsContainerState,
        isWordsContainerState,

        words,
        wordsWithoutStatusFilter,
        wordsFilters,

        toggleAllWordsSelection,
        selectedWords,
        isAllWordsSelected,
        toggleWordSelection,

        isAddWordBlockNeededByUserRequest,
        toggleIsAddWordBlockNeeded,

        addWord,
        deleteWord,
        updateWordTranslations,
        updateWordStatus,

        bottom,
    }
})

export { useProvideWordsContainerStore }

export const useWordsContainerStore = () => {
    const store = baseUseWordsContainerStore()
    if (store == null)
        throw new Error('Please call `useProvideWordsContainerStore` on the appropriate parent component')

    return store
}
