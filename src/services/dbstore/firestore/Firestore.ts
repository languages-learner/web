import { UserFirestoreCollection } from '@/services/dbstore/firestore/UserFirestoreCollection'
import { IDbStore } from '@/services/dbstore/IDbStore'

export class Firestore implements IDbStore {
    public readonly UserCollection: UserFirestoreCollection

    constructor() {
        this.UserCollection = new UserFirestoreCollection()
    }
}
