import { type Word } from '@/services/dbstore/dto/Words'

export interface WordsContainerWordsListItemProps {
    source: {
        word: string
        wordData: Word
        disabled?: boolean
    }
}
