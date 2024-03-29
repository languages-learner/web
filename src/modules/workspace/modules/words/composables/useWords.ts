import { debounce } from 'lodash'
import { isDefined } from '@vueuse/core'
import type { Words } from '@/services/dbstore/dto/Words'
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { type EWordStatus } from '@/services/dbstore/dto/Words'
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

    const words = reactive<Words>(new Map()) as Words
    const wordsWithoutStatusFilter = reactive<Words>(new Map()) as Words
    const isAllWordsLoaded = ref(false)
    const isAddingWord = ref(false)

    const {
        isLoading: isWordsLoading,
        wasLoadedAtLeastOnce: isWordsLoaded,
        execute: fetchWords,
        reset: resetFetchWords,
    } = useRequestMethod(async (abortController) => {
        try {
            wordsWithoutStatusFilter.clear()

            const items = await wordsCollection.items(true,  settings.limitWordsToFetch, [{
                type: 'word',
                value: filters.formattedText,
            }, {
                type: 'status',
                value: filters.status,
            }], abortController)

            if (!items?.has(filters.formattedText) && filters.status !== -1) {
                const itemsWithoutStatusFilter = await wordsCollection.items(false,  settings.limitWordsToFetch, [{
                    type: 'word',
                    value: filters.formattedText,
                }, {
                    type: 'status',
                    value: -1,
                }], abortController)

                if (itemsWithoutStatusFilter)
                    Array.from(itemsWithoutStatusFilter).forEach(([word, wordData]) => {
                        if (wordData.status === filters.status)
                            return
                        wordsWithoutStatusFilter.set(word, wordData)
                    })
            }

            if (abortController.signal.aborted) {
                return Promise.reject()
            }

            if (!items) {
                isAllWordsLoaded.value = true

                return Promise.resolve()
            }

            let countAddedWords = 0
            Array.from(items).forEach(([word, wordData]) => {
                if (!words.has(word)) {
                    countAddedWords += 1
                }

                words.set(word, wordData)
            })

            isAllWordsLoaded.value = countAddedWords === 0 || items.size < settings.limitWordsToFetch

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
        isAddingWord.value = true
        const result = await wordControl.addWord(toLowerCase(word), toLowerCase(translations))
        if (result) {
            words.set(toLowerCase(word), result)
        }
        isAddingWord.value = false

        return isDefined(result)
    }

    const deleteWord = async (word: string) => {
        const result = await wordControl.deleteWord(word)
        if (result) {
            words.delete(word)
        }
    }

    const updateWordTranslations = async (word: string, translations: string[]) => {
        const result = await wordControl.updateWordTranslations(word,  words.get(word)!, toLowerCase(translations))
        if (!result) {
            words.delete(word)

            return
        }
        words.set(word, result)
    }

    const updateWordStatus = async (word: string, status: EWordStatus) => {
        words.set(word, await wordControl.updateWordStatus(word,  words.get(word)!, status) ?? words.get(word)!)
    }

    const resetWords = () => {
        resetFetchWords()
        words.clear()
        wordsCollection.resetWordsPagination()
        isAllWordsLoaded.value = false
    }

    return {
        words,
        wordsWithoutStatusFilter,
        isWordsLoading: computed(() => unref(isWordsLoading) || unref(isAddingWord)),
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
