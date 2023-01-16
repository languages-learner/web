import {  reactive } from 'vue'
import type { WordsFilters } from '@/modules/words/types/WordsFilters'

export const useWordsFilters = () => {
    const filters: WordsFilters = reactive({
        text: '',
        status: -1
    })

    const updateText = (value: WordsFilters['text']) => {
        filters.text = value
    }

    const updateStatus = (value: WordsFilters['status']) => {
        filters.status = value
    }

    return {
        filters,
        updateText,
        updateStatus
    }
}
