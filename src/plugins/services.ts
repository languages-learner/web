import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { Firestore } from '@/services/dbstore/firestore/Firestore'
import {
    AuthenticationService,
    DbStoreServiceKey,
    ConfigServiceKey,
} from '@/symbols'
import { App, inject } from 'vue'
import { Config } from '@/services/configuration/firebase/Config'

export async function setupServices(app: App<Element>) {
    app.provide(AuthenticationService, new FirebaseAuthentication())
    app.provide(DbStoreServiceKey, new Firestore())
    const configService = new Config()
    await configService.setup()
    app.provide(ConfigServiceKey, configService)
}

export const useAuthenticationService = () => {
    const service = inject(AuthenticationService)
    if (!service)
        throw new Error('Authenticate service was not initialized.')

    return service
}

export const useDbStore = () => {
    const service = inject(DbStoreServiceKey)
    if (!service)
        throw new Error('Firestore service was not initialized.')

    return service
}

export const useConfigService = () => {
    const service = inject(ConfigServiceKey)
    if (!service)
        throw new Error('Config service was not initialized.')

    return service
}
