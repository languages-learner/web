import { EWordStatus } from '@/modules/words/enums/EWordStatus'

export interface WordsFilters {
    text: string
    status: EWordStatus | -1
}
