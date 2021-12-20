import { UserFirestoreCollection } from '@/services/firestore/UserFirestoreCollection'

export class Firestore {
    public readonly UserCollection: UserFirestoreCollection

    constructor() {
        this.UserCollection = new UserFirestoreCollection()
    }
}
