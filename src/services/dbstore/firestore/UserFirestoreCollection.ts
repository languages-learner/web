import type User from '@/services/dbstore/dto/User'
import type { IUserCollection } from '@/services/dbstore/interfaces/IUserCollection'
import { BaseFirestoreCollection } from '@/services/dbstore/firestore/common/BaseFirestoreCollection'
import { useUserStoreWithOut } from '@/store/modules/user'

const COLLECTION_NAME = 'users'

export class UserFirestoreCollection extends BaseFirestoreCollection<User> implements IUserCollection {
    constructor() {
        super(COLLECTION_NAME)
    }

    private get currentUserDoc() {
        const userStore = useUserStoreWithOut()

        if (!userStore.profileData){
            throw new Error('User data not initialized')
        }

        return this._collection
            .doc(userStore.profileData.uid)
    }

    public create = async (user: User): Promise<void> => {
        await this.currentUserDoc.set(user)
    }

    public get = async (): Promise<User | null> => {
        const item = await this.currentUserDoc.get()

        return item.exists ? item.data() as User : null
    }
}
