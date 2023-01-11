import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { User } from '@/services/user/User'
import { Firestore } from '@/services/dbstore/firestore/Firestore'
import {
    FirebaseAuthenticationServiceKey,
    UserServiceKey,
    DbStoreServiceKey,
    ConfigServiceKey,
} from '@/symbols'
import { App, inject } from 'vue'
import { Config } from '@/services/configuration/firebase/Config'

export function setupServices(app: App<Element>) {
    const firebaseAuthentication = new FirebaseAuthentication()
    app.provide(FirebaseAuthenticationServiceKey, firebaseAuthentication)
    app.provide(UserServiceKey, new User(firebaseAuthentication))
    app.provide(DbStoreServiceKey, new Firestore())
    app.provide(ConfigServiceKey, new Config())
}

export const useFirebaseAuthentication = () => {
    const service = inject(FirebaseAuthenticationServiceKey)
    if (!service)
        throw new Error('Authenticate service was not initialized.')

    return service
}

export const useUser = () => {
    const service = inject(UserServiceKey)
    if (!service)
        throw new Error('User service was not initialized.')

    return service
}

export const useDbStore = () => {
    const service = inject(DbStoreServiceKey)
    if (!service)
        throw new Error('Firestore service was not initialized.')

    return service
}

export const useConfig = () => {
    const service = inject(ConfigServiceKey)
    if (!service)
        throw new Error('Config service was not initialized.')

    return service
}
