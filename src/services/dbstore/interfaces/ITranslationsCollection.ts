export interface ITranslationsCollection {
    get(languageName: string): Promise<any | null>
}
