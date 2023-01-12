import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { Firestore } from '@/services/dbstore/firestore/Firestore'
import { Config } from '@/services/configuration/firebase/Config'
import { IConfigService } from '@/services/configuration/common/IConfigService'
import { IDbStore } from '@/services/dbstore/common/IDbStore'
import { IAuthentication } from '@/services/authentication/common/IAuthentication'

export async function setupServices() {
    const configService = Config.getInstance()
    await configService.setup()
}

export const useAuthenticationService = (): IAuthentication => {
    return FirebaseAuthentication.getInstance()
}

export const useDbStore = (): IDbStore => {
    return Firestore.getInstance()
}

export const useConfigService = (): IConfigService => {
    return Config.getInstance()
}
