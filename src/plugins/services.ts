import { Authenticate } from '@/services/Authenticate'
import { Firestore } from '@/services/firestore/Firestore'
import {
    AuthenticateServiceKey,
    FirestoreServiceKey
} from '@/symbols'
import { inject } from 'vue'

export default {
    // eslint-disable-next-line
    install: (app: any): void => {
        app.provide(AuthenticateServiceKey, new Authenticate())
        app.provide(FirestoreServiceKey, new Firestore())
    }
}

export const useAuthenticate = (): Authenticate => {
    const service = inject(AuthenticateServiceKey)
    if (!service)
        throw new Error('Authenticate service was not initialized.')

    return service
}

export const useFirestore = (): Firestore => {
    const service = inject(FirestoreServiceKey)
    if (!service)
        throw new Error('Firestore service was not initialized.')

    return service
}
