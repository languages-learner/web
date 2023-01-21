import {
    computed,
    onUnmounted,
    reactive,
    ref,
    unref,
    watch,
} from 'vue'
import { cloneDeep, debounce } from 'lodash'
import type { Word, Words } from '@/services/dbstore/dto/Words'
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { EWordStatus } from '@/services/dbstore/dto/Words'
import { useDbStore } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { getErrorMessage } from '@/utils/error'
import { useRequestMethod } from '@/composables/useRequestMethod'

type Settings = {
    limitWordsToFetch: number
}

export const useWords = (filters: WordsFilters = {
    text: '',
    status: -1,
}, settings: Settings = {
    limitWordsToFetch: 10,
}) => {
    const { addErrorLogInfo } = useErrorLogStore()
    const { wordsCollection } = useDbStore()

    const selectedWords: Record<string, boolean> = reactive({})

    const words: Words = reactive({})
    const formattedWords = computed(() => Object.entries(words))

    const isAllWordsLoaded = ref(false)

    const {
        isLoading: isWordsLoading,
        wasLoadedAtLeastOnce: isWordsLoaded,
        execute: fetchWords,
        reset: resetFetchWords,
    } = useRequestMethod(async (abortController) => {
        try {
            const items = await wordsCollection.items(true,  settings.limitWordsToFetch, [{
                type: 'word',
                value: filters.text,
            }, {
                type: 'status',
                value: filters.status,
            }], abortController)

            if (abortController.signal.aborted) {
                return Promise.reject()
            }

            if (!items) {
                isAllWordsLoaded.value = true

                return Promise.resolve()
            }

            let countAddedWords = 0
            Object.entries(items).forEach(([word, wordData]: [word: string, wordData: Word]) => {
                if (!words[word]) {
                    countAddedWords += 1
                }

                words[word] = wordData
            })

            isAllWordsLoaded.value = countAddedWords === 0 || Object.keys(items).length < settings.limitWordsToFetch

            return Promise.resolve()
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'fetchWords' })

            return Promise.reject(e)
        }
    }, {
        allowConcurrentRequests: false,
        autoSetLoadingStatus: true,
        executeCondition: () => !unref(isAllWordsLoaded),
    })
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
            status: EWordStatus.NEW_WORD,
        }

        try {
            words[word] = await wordsCollection.create(word, wordData)
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'addWord' })
        }
    }

    const deleteWord = async (word: string) => {
        try {
            await wordsCollection.delete(word)
            delete words[word]
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'deleteWord' })
        }
    }

    const updateWord = async <K extends keyof Omit<Word, 'created' | 'updated'>>(word: string, property: K, value: Word[K]) => {
        if (!words[word]) {
            return
        }

        try {
            const newWordData = cloneDeep(words[word])
            newWordData[property] = value

            await wordsCollection.update(word, newWordData)

            words[word].updated = newWordData.updated
            words[word][property] = newWordData[property]
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'updateWord' })
        }
    }

    const updateWordTranslations = async (word: string, translations: string[]) => {
        if (!translations.length) {
            await deleteWord(word)

            return
        }

        await updateWord(word, 'translations', translations)
    }

    const updateWordStatus = async (word: string, status: EWordStatus) => updateWord(word, 'status', status)

    const reset = () => {
        resetFetchWords()
        Object.keys(words).forEach(word => {
            delete words[word]
        })
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
    onUnmounted(reset)

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
        resetAndFetchWords,
    }
}
