import type { Word, Words } from '@/modules/words/models/Words'

export interface IWordsCollection {
    items(): Promise<Words | null>
    create(word: string, wordData: Word): Promise<void>
    update(word: string, wordData: Word): Promise<void>
    delete(word: string): Promise<void>
}
