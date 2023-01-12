import { ICollection } from '@/services/dbstore/common/ICollection'
import User from '@/models/User'

export interface IDbStore {
    readonly userCollection: ICollection<User>
    readonly translationCollection: ICollection<any>
}
