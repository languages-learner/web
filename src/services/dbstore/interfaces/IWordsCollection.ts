import type { Word, Words } from '@/services/dbstore/dto/Words'
import type { WordsCollectionFetchItemsFilter } from '@/services/dbstore/types/words/WordsCollectionFetchItemsFilter'

export interface IWordsCollection {
    items(paginate: boolean, limit: number, filters: Array<WordsCollectionFetchItemsFilter>): Promise<Words | null>
    create(word: string, wordData: Omit<Word, 'created' | 'updated'>): Promise<Word>
    update(word: string, wordData: Word): Promise<Word>
    delete(word: string): Promise<void>
    resetWordsPagination(): void
}
