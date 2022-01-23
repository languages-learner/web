import User from '@/models/User'
import { BaseFirestoreCollection } from '@/services/dbstore/firestore/common/BaseFirestoreCollection'

const COLLECTION_NAME = 'users'

export class UserFirestoreCollection extends BaseFirestoreCollection<User> {
    constructor() {
        super(COLLECTION_NAME)
    }
}
