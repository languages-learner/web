import { reactive } from 'vue'
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'

export const useWordsFilters = (baseFilters: WordsFilters = {
    text: '',
    status: -1,
}) => {
    const wordsFilters: WordsFilters = reactive(baseFilters)

    const resetWordsFilters = () => {
        wordsFilters.text = ''
        wordsFilters.status = -1
    }

    return {
        wordsFilters,
        resetWordsFilters,
    }
}
