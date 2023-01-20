import { EWordStatus } from '@/modules/words/enums/EWordStatus'

export type Word = {
    translations: string[],
    status: EWordStatus
    created: number
    updated: number
}

export type Words = {
    [word: string]: Word
}
