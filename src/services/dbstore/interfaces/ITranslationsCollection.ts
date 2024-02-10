// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export type TranslationsCollectionItems = Record<string, string | Record<string, TranslationsCollectionItems>>

export interface ITranslationsCollection {
    get(languageName: string): Promise<TranslationsCollectionItems | undefined>
}
