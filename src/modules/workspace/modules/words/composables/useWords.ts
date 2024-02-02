import {
    reactive,
    ref,
    unref,
} from 'vue'
import { debounce } from 'lodash'
import type { Word, Words } from '@/services/dbstore/dto/Words'
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { type EWordStatus } from '@/services/dbstore/dto/Words'
import { useDbStore } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { getErrorMessage } from '@/utils/error'
import { useRequestMethod } from '@/composables/useRequestMethod'
import { useWord } from '@/modules/workspace/modules/words/composables/useWord'

export type WordsLoaderSettings = {
    limitWordsToFetch: number
}

export const useWords = (
    filters: WordsFilters,
    settings: WordsLoaderSettings,
) => {
    const { addErrorLogInfo } = useErrorLogStore()
    const { wordsCollection } = useDbStore()
    const wordControl = useWord()

    const words = reactive<Words>({})
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
            console.log(filters, items)

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

    const addWord = async (word: string, translations: string[]) => {
        const result = await wordControl.addWord(word, translations)
        if (result) {
            words[word] = result
        }
    }

    const deleteWord = async (word: string) => {
        const result = await wordControl.deleteWord(word)
        if (result) {
            delete words[word]
        }
    }

    const updateWordTranslations = async (word: string, translations: string[]) => {
        const result = await wordControl.updateWordTranslations(word,  words[word], translations)
        if (!result) {
            delete words[word]

            return
        }
        words[word] = result
    }

    const updateWordStatus = async (word: string, status: EWordStatus) => {
        words[word] = await wordControl.updateWordStatus(word,  words[word], status) ?? words[word]
    }

    const resetWords = () => {
        resetFetchWords()
        Object.keys(words).forEach(word => {
            delete words[word]
        })
        wordsCollection.resetWordsPagination()
        isAllWordsLoaded.value = false
    }

    return {
        words,
        isWordsLoading,
        isWordsLoaded,
        isAllWordsLoaded,
        fetchWords,
        fetchWordsDebounced,
        resetWords,
        addWord,
        deleteWord,
        updateWordTranslations,
        updateWordStatus,
    }
}
