import { InjectionKey } from 'vue'

import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { User } from '@/services/user/User'
import { IDbStore } from '@/services/dbstore/IDbStore'

export const FirebaseAuthenticationServiceKey: InjectionKey<FirebaseAuthentication> = Symbol('FirebaseAuthenticationService')
export const UserServiceKey: InjectionKey<User> = Symbol('UserService')
export const DbStoreServiceKey: InjectionKey<IDbStore> = Symbol('DbStoreService')
