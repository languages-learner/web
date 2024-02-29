import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'

export const useWordsFilters = (baseFilters: Omit<WordsFilters, 'formattedText'> = {
    text: '',
    status: -1,
}) => {
    const wordsFilters: WordsFilters = reactive({
        ...baseFilters,
        get formattedText() {
            return this.text.toLowerCase()
        },
    })

    const resetWordsFilters = () => {
        wordsFilters.text = ''
        wordsFilters.status = -1
    }

    return {
        wordsFilters,
        resetWordsFilters,
    }
}
