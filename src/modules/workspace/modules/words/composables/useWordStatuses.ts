import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { EWordStatus, getWordStatusesValues } from '@/services/dbstore/dto/Words'

export const useWordStatuses = () => {
    const { t } = useI18n()

    const wordStatusOptions: Array<{
        label: string,
        value: WordsFilters['status']
    }> = [
        {
            label: t('new_word'),
            value: EWordStatus.NEW_WORD,
        },
        {
            label: t('learn'),
            value: EWordStatus.LEARN,
        },
        {
            label: t('learned'),
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
