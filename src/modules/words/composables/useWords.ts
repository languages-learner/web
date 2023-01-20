import {
    computed,
    reactive,
    ref,
    unref,
    watch
} from 'vue'
import type { Word, Words } from '@/modules/words/models/Words'
import type { WordsFilters } from '@/modules/words/types/WordsFilters'
import { EWordStatus } from '@/modules/words/enums/EWordStatus'
import { useDbStore } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { debounce } from 'lodash'

type Settings = {
    limitWordsToFetch: number
}

export const useWords = (filters: WordsFilters = {
    text: '',
    status: -1
}, settings: Settings = {
    limitWordsToFetch: 10
}) => {
    const { addErrorLogInfo } = useErrorLogStore()
    const { wordsCollection } = useDbStore()

    const selectedWords: Record<string, boolean> = reactive({})

    const words: Words = reactive({})
    const formattedWords = computed(() => Object.entries(words))

    const isWordsLoaded = ref(false)
    const isAllWordsLoaded = ref(false)
    const isWordsLoading = ref(false)

    const fetchWords = async () => {
        if (unref(isAllWordsLoaded)) {
            return
        }

        isWordsLoading.value = true
        try {
            const items = await wordsCollection.items(true,  settings.limitWordsToFetch, [{
                type: 'word',
                value: filters.text
            }, {
                type: 'status',
                value: filters.status
            }])

            if (!items) {
                isAllWordsLoaded.value = true

                return
            }

            let countAddedWords = 0
            Object.entries(items).forEach(([word, wordData]: [word: string, wordData: Word]) => {
                if (!words[word]) {
                    countAddedWords += 1
                }

                words[word] = wordData
            })

            isAllWordsLoaded.value = countAddedWords === 0 || Object.keys(items).length < settings.limitWordsToFetch
            isWordsLoaded.value = true
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'fetchWords' })
        } finally {
            isWordsLoading.value = false
        }
    }
    const fetchWordsDebounced = debounce(fetchWords, 300)

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

        const wordData: Omit<Word, 'created' | 'updated'> = {
            translations,
            status: EWordStatus.NEW_WORD
        }

        try {
            words[word] = await wordsCollection.create(word, wordData)
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

    const updateWord = async (word: string, wordData: Word, updatedProperty: keyof Word) => {
        if (!words[word]) {
            return
        }

        try {
            const newWordData = await wordsCollection.update(word, wordData)
            words[word].updated = newWordData.updated
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            words[word][updatedProperty] = newWordData[updatedProperty]
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: e.message, detail: 'updateWord' })
        }
    }

    const updateWordTranslations = async (word: string, translations: string[]) => {
        if (!translations.length) {
            await deleteWord(word)

            return
        }

        await updateWord(word, {
            ...words[word],
            translations,
        }, 'translations')
    }

    const updateWordStatus = async (word: string, status: number) => {
        await updateWord(word, {
            ...words[word],
            status,
        }, 'status')
    }

    const reset = () => {
        Object.keys(words).forEach(word => {
            delete words[word]
        })
        isWordsLoaded.value = false
        Object.keys(selectedWords).forEach(word => {
            delete selectedWords[word]
        })
        wordsCollection.resetWordsPagination()
        isAllWordsLoaded.value = false
    }
    const resetAndFetchWords = async () => {
        reset()
        await fetchWords()
    }

    watch(filters, () => {
        reset()
        fetchWordsDebounced()
    })

    return {
        words: formattedWords,
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
        resetAndFetchWords
    }
}
