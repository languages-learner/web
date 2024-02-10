import type { Word, Words } from '@/services/dbstore/dto/Words'
import type { WordsCollectionFetchItemsFilter } from '@/services/dbstore/types/words/WordsCollectionFetchItemsFilter'

export interface IWordsCollection {
    items(paginate: boolean, limit: number, filters: Array<WordsCollectionFetchItemsFilter>, abortController?: AbortController): Promise<Words | undefined>
    create(word: string, translations: Word['translations']): Promise<Word>
    update(word: string, wordData: Word): Promise<Word>
    delete(word: string): Promise<void>
    has(word: string): Promise<boolean>
    resetWordsPagination(): void
}
