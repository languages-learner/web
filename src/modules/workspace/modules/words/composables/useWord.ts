import { cloneDeep } from 'lodash'
import type { Word } from '@/services/dbstore/dto/Words'
import { type EWordStatus } from '@/services/dbstore/dto/Words'
import { useDbStore } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { getErrorMessage } from '@/utils/error'

export const useWord = () => {
    const { addErrorLogInfo } = useErrorLogStore()
    const { wordsCollection } = useDbStore()

    const addWord = async (word: string, translations: string[]) => {
        try {
            if (await wordsCollection.has(word)) {
                return
            }

            return await wordsCollection.create(word, translations)
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'addWord' })
        }
    }

    const deleteWord = async (word: string) => {
        try {
            await wordsCollection.delete(word)

            return true
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'deleteWord' })
        }

        return false
    }

    const updateWord = async <K extends keyof Omit<Word, 'created' | 'updated'>>(word: string, wordData: Word, property: K, value: Word[K]) => {
        try {
            const newWordData = cloneDeep(wordData)
            newWordData[property] = value

            return wordsCollection.update(word, newWordData)
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.WORDS_STORE, message: getErrorMessage(e), detail: 'updateWord' })
        }
    }

    const updateWordTranslations = async (word: string, wordData: Word, translations: string[]) => {
        if (!translations.length) {
            const deleteResult = await deleteWord(word)

            return deleteResult ? undefined : wordData
        }

        return updateWord(word, wordData, 'translations', translations)
    }

    const updateWordStatus = async (word: string, wordData: Word, status: EWordStatus) => updateWord(word, wordData, 'status', status)

    return {
        addWord,
        deleteWord,
        updateWordTranslations,
        updateWordStatus,
    }
}
