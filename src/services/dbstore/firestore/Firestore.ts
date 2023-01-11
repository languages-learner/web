import { UserFirestoreCollection } from '@/services/dbstore/firestore/UserFirestoreCollection'
import { IDbStore } from '@/services/dbstore/IDbStore'

export class Firestore implements IDbStore {
    public readonly userCollection: UserFirestoreCollection

    constructor() {
        this.userCollection = new UserFirestoreCollection()
    }
}
