import {
    computed,
    reactive,
    ref,
    unref
} from 'vue'
import type { Word, Words } from '@/modules/words/models/Words'
import type { WordsFilters } from '@/modules/words/types/WordsFilters'
import { EWordStatus } from '@/modules/words/enums/EWordStatus'
import { useDbStore } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'

export const useWords = (filters: WordsFilters = {
    text: '',
    status: -1
}) => {
    const { addErrorLogInfo } = useErrorLogStore()
    const { wordsCollection } = useDbStore()

    const selectedWords: Record<string, boolean> = reactive({})

    const words: Words = reactive({})
    const isWordsLoaded = ref(false)

    const fetchWords = async () => {
        try {
            const items = await wordsCollection.items()

            if (!items) {
                return
            }

            Object.entries(items).forEach(([word, wordData]: [word: string, wordData: Word]) => {
                words[word] = wordData
            })

            isWordsLoaded.value = true
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'fetchWords' })
        }
    }

    const filterByText = (text: WordsFilters['text'], word: string, wordData: Word) => {
        return word.includes(text) || wordData.translations.some(translation => translation.includes(text))
    }
    const filterByStatus = (status: WordsFilters['status'], wordData: Word) => {
        return status === -1 || wordData.status === status
    }
    const filteredWords = computed(() => {
        return Object.entries(words)
            .filter(([word, wordData]) => filterByText(filters.text, word, wordData))
            .filter(([, translation]) => filterByStatus(filters.status, translation))
    })

    const isAllWordsSelected = computed(() => Object.keys(words).length > 0 && Object.keys(selectedWords).length === Object.keys(words).length)

    const toggleWordSelection = (word: string) => {
        if (!selectedWords[word])
            selectedWords[word] = true
        else
            delete selectedWords[word]
    }

    const toggleAllWordsSelection = () => {
        if (!unref(isAllWordsSelected)) {
            Object.keys(words).forEach(word => {
                if (!selectedWords[word])
                    selectedWords[word] = true
            })

            return
        }

        Object.keys(selectedWords).forEach(word => {
            delete selectedWords[word]
        })
    }

    const addWord = async (word: string, translations: string[]) => {
        if (words[word]) {
            return
        }

        const wordData = {
            translations,
            status: EWordStatus.NEW_WORD
        } as Word

        try {
            await wordsCollection.create(word, wordData)
            words[word] = wordData
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'addWord' })
        }
    }

    const deleteWord = async (word: string) => {
        try {
            await wordsCollection.delete(word)
            delete words[word]
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'deleteWord' })
        }
    }

    const updateTranslations = async (word: string, translations: string[]) => {
        if (!words[word]) {
            return
        }

        if (!translations.length) {
            await deleteWord(word)

            return
        }

        try {
            await wordsCollection.update(word, {
                translations,
                status: words[word].status
            })

            words[word].translations = translations
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'updateTranslations' })
        }
    }

    const updateWordStatus = async (word: string, status: number) => {
        try {
            await wordsCollection.update(word, {
                translations: words[word].translations,
                status
            })

            words[word].status = status
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'updateWordStatus' })
        }
    }

    const resetAndFetchWords = async () => {
        Object.keys(words).forEach(word => {
            delete words[word]
        })
        isWordsLoaded.value = false
        Object.keys(selectedWords).forEach(word => {
            delete selectedWords[word]
        })
        await fetchWords()
    }

    return {
        words: filteredWords,
        isWordsLoaded,
        selectedWords,
        isAllWordsSelected,
        toggleWordSelection,
        toggleAllWordsSelection,
        addWord,
        deleteWord,
        updateTranslations,
        updateWordStatus,
        fetchWords,
        resetAndFetchWords
    }
}
