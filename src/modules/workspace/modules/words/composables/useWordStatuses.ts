import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import { EWordStatus, getWordStatusesValues } from '@/services/dbstore/dto/Words'

export const WordStatusTranslationKey: Record<EWordStatus, string> = {
    [EWordStatus.NEW_WORD]: 'new_word',
    [EWordStatus.LEARN]: 'learn',
    [EWordStatus.LEARNED]: 'learned',
}

export const useWordStatuses = () => {
    const { t } = useI18n()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const wordStatusLabel: Record<EWordStatus, string> = Object.fromEntries(
        getWordStatusesValues()
            .map((status) => [status as EWordStatus, t(WordStatusTranslationKey[status as EWordStatus])] as [EWordStatus, string]),
    )

    const wordStatusOptions: Array<{
        label: string,
        value: WordsFilters['status']
    }> = getWordStatusesValues().map((status) => ({
        label: wordStatusLabel[status as EWordStatus],
        value: status as EWordStatus,
    }))

    const wordStatusOptionsWithAll = [{
        label: t('all'),
        value: -1,
    }].concat(wordStatusOptions)

    return {
        wordStatusLabel,
        wordStatusOptions,
        wordStatusOptionsWithAll,
        getWordStatusesValues,
    }
}
