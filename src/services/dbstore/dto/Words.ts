export enum EWordStatus {
    NEW_WORD = 0,
    LEARN = 1,
    LEARNED = 2
}

export const getWordStatusesValues = (): EWordStatus[] => {
    return Object.values(EWordStatus)
        .filter(item => !isNaN(Number(item)))
        .map(item => Number(item) as EWordStatus)
}

export type Word = {
    translations: string[]
    status: EWordStatus
    created: number
    updated: number
}

export type Words = Map<string, Word>
