import type { EWordStatus } from '@/services/dbstore/dto/Words'

export interface WordsFilters {
    text: string
    status: EWordStatus | -1
}
