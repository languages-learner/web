import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { EWordStatus, getWordStatusesValues } from '@/services/dbstore/dto/Words'

export const WordStatusTranslationKey: Record<EWordStatus, string> = {
    [EWordStatus.NEW_WORD]: 'new_word',
    [EWordStatus.LEARN]: 'learn',
    [EWordStatus.LEARNED]: 'learned',
}

export const useWordStatuses = () => {
    const { t } = useI18n()

    const wordStatusOptions: Array<{
        label: string,
        value: WordsFilters['status']
    }> = [
        {
            label: t(WordStatusTranslationKey[EWordStatus.NEW_WORD]),
            value: EWordStatus.NEW_WORD,
        },
        {
            label: t(WordStatusTranslationKey[EWordStatus.LEARN]),
            value: EWordStatus.LEARN,
        },
        {
            label: t(WordStatusTranslationKey[EWordStatus.LEARNED]),
            value: EWordStatus.LEARNED,
        },
    ]

    const wordStatusOptionsWithAll = [{
        label: t('all'),
        value: -1,
    }].concat(wordStatusOptions)

    return {
        wordStatusOptions,
        wordStatusOptionsWithAll,
        getWordStatusesValues,
    }
}
