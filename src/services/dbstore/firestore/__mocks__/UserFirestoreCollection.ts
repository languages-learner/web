import type User from '@/services/dbstore/dto/User'
import type { IUserCollection } from '@/services/dbstore/interfaces/IUserCollection'
import { useUserStore } from '@/store/modules/user'

export class UserFirestoreCollection implements IUserCollection {
    private checkCurrentUser() {
        const userStore = useUserStore()

        if (!userStore.profileData){
            throw new Error('User data not initialized')
        }
    }

    public create = async (user: User) => {
        this.checkCurrentUser()
    }

    public get = async (): Promise<User | null> => {
        this.checkCurrentUser()

        return {
            interfaceLanguage: 0,
            nativeLanguage: 1,
            activeLearningLanguage: 0,
        }
    }
}