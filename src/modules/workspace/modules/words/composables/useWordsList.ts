import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { type WordsLoaderSettings, useWords } from '@/modules/workspace/modules/words/composables/useWords'

export const useWordsList = (
    filters: WordsFilters,
    settings: WordsLoaderSettings = {
        limitWordsToFetch: 20,
    },
) => {
    const {
        words,
        wordsWithoutStatusFilter,
        isWordsLoading,
        isWordsLoaded,
        fetchWords,
        fetchWordsDebounced,
        resetWords,
        addWord,
        deleteWord,
        updateWordTranslations,
        updateWordStatus,
    } = useWords(filters, settings)
    const {
        selectedItems: selectedWords,
        isAllItemsSelected: isAllWordsSelected,
        toggleItemSelection: toggleWordSelection,
        toggleAllItemsSelection: toggleAllWordsSelection,
        resetSelectedItems: resetSelectedWords,
    } = useItemsSelection(words)

    const reset = () => {
        resetSelectedWords()
        resetWords()
    }
    const resetAndFetchWords = async () => {
        reset()
        await fetchWords()
    }

    watch(filters, () => {
        reset()
        fetchWordsDebounced()
    })
    onUnmounted(reset)

    return {
        words,
        wordsWithoutStatusFilter,
        isWordsLoaded,
        isWordsLoading,
        selectedWords,
        isAllWordsSelected,
        toggleWordSelection,
        toggleAllWordsSelection,
        addWord,
        deleteWord,
        updateWordTranslations,
        updateWordStatus,
        fetchWords,
        resetAndFetchWords,
    }
}
