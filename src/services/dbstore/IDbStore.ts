import { ICollection } from '@/services/dbstore/ICollection'
import User from '@/models/User'

export interface IDbStore {
    readonly UserCollection: ICollection<User>
}
