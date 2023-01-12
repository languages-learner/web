import { BaseFirestoreCollection } from '@/services/dbstore/firestore/common/BaseFirestoreCollection'

const COLLECTION_NAME = 'translations'

export class TranslationsFirestoreCollection extends BaseFirestoreCollection<any> {
    constructor() {
        super(COLLECTION_NAME)
    }
}
