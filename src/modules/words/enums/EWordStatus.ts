export enum EWordStatus {
    NEW_WORD = 0,
    LEARN = 1,
    LEARNED = 2
}

export const getWordStatusesValues = (): EWordStatus[] => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.values(EWordStatus).filter(item => !isNaN(Number(item)))
}
