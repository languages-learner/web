import type { IConfigService } from '@/services/configuration/interfaces/IConfigService'
import type { IDbStore } from '@/services/dbstore/interfaces/IDbStore'
import type { IAuthentication } from '@/services/authentication/interfaces/IAuthentication'
import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { Firestore } from '@/services/dbstore/firestore/Firestore'
import { Config } from '@/services/configuration/firebase/Config'

export const setupServices = async () => {
    const configService = Config.getInstance()
    await configService.setup()
}

export const useAuthenticationService: () => IAuthentication = FirebaseAuthentication.getInstance
export const useDbStore: () => IDbStore = Firestore.getInstance
export const useConfigService: () => IConfigService = Config.getInstance
