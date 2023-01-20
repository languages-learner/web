import type { Word } from '@/modules/words/models/Words'

type WordsCollectionFetchItemsWordFilter = {
    type: 'word'
    value: string
}

type WordsCollectionFetchItemsStatusFilter = {
    type: 'status'
    value: Word['status'] | -1
}

export type WordsCollectionFetchItemsFilter =
    WordsCollectionFetchItemsWordFilter |
    WordsCollectionFetchItemsStatusFilter
