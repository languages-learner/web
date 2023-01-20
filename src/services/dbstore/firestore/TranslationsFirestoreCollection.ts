import { BaseFirestoreCollection } from '@/services/dbstore/firestore/common/BaseFirestoreCollection'
import { ITranslationsCollection } from '@/services/dbstore/interfaces/ITranslationsCollection'

const COLLECTION_NAME = 'translations'

export class TranslationsFirestoreCollection extends BaseFirestoreCollection<any> implements ITranslationsCollection {
    constructor() {
        super(COLLECTION_NAME)
    }

    public get = async (languageName: string): Promise<any | null> => {
        const item = await this._collection.doc(languageName).get()

        return item.exists ? item.data() as any : null
    }
}
