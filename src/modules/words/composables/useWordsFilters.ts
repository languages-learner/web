import {  reactive } from 'vue'
import type { WordsFilters } from '@/modules/words/types/WordsFilters'

export const useWordsFilters = (baseFilters: WordsFilters = {
    text: '',
    status: -1
}) => {
    const filters: WordsFilters = reactive(baseFilters)

    const reset = () => {
        filters.text = ''
        filters.status = -1
    }

    return {
        filters,
        reset,
    }
}
