import type { ITranslationsCollection } from '@/services/dbstore/interfaces/ITranslationsCollection'
import { type TranslationsCollectionItems } from '@/services/dbstore/interfaces/ITranslationsCollection'

export class TranslationsFirestoreCollection implements ITranslationsCollection {
    public get = async (): Promise<TranslationsCollectionItems | undefined> => {
        return {}
    }
}
