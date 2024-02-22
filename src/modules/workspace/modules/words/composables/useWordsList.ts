import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { type WordsLoaderSettings, useWords } from '@/modules/workspace/modules/words/composables/useWords'

export const useWordsList = (
    filters: WordsFilters = {
        text: '',
        status: -1,
    },
    settings: WordsLoaderSettings = {
        limitWordsToFetch: 10,
    },
) => {
    const {
        words,
        isWordsLoading,
        isWordsLoaded,
        isAddingWord,
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
        isWordsLoaded,
        isWordsLoading,
        isAddingWord,
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
