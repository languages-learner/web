import { EWordStatus } from '@/modules/words/enums/EWordStatus'

export type Word = {
    translations: string[],
    status: EWordStatus
}

export type Words = {
    [word: string]: Word
}
