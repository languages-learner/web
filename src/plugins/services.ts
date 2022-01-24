import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { User } from '@/services/user/User'
import { Firestore } from '@/services/dbstore/firestore/Firestore'
import { IDbStore } from '@/services/dbstore/IDbStore'
import {
    FirebaseAuthenticationServiceKey,
    UserServiceKey,
    DbStoreServiceKey
} from '@/symbols'
import { App, inject } from 'vue'

export function setupServices(app: App<Element>) {
    const firebaseAuthentication = new FirebaseAuthentication()
    app.provide(FirebaseAuthenticationServiceKey, firebaseAuthentication)
    app.provide(UserServiceKey, new User(firebaseAuthentication))
    app.provide(DbStoreServiceKey, new Firestore())
}

export const useFirebaseAuthentication = (): FirebaseAuthentication => {
    const service = inject(FirebaseAuthenticationServiceKey)
    if (!service)
        throw new Error('Authenticate service was not initialized.')

    return service
}

export const useUser = (): User => {
    const service = inject(UserServiceKey)
    if (!service)
        throw new Error('User service was not initialized.')

    return service
}

export const useDbStore = (): IDbStore => {
    const service = inject(DbStoreServiceKey)
    if (!service)
        throw new Error('Firestore service was not initialized.')

    return service
}
