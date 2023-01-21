import type { IConfigService } from '@/services/configuration/common/IConfigService'
import type { IDbStore } from '@/services/dbstore/common/IDbStore'
import type { IAuthentication } from '@/services/authentication/common/IAuthentication'
import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { Firestore } from '@/services/dbstore/firestore/Firestore'
import { Config } from '@/services/configuration/firebase/Config'

export async function setupServices() {
    const configService = Config.getInstance()
    await configService.setup()
}

export const useAuthenticationService: () => IAuthentication = FirebaseAuthentication.getInstance
export const useDbStore: () => IDbStore = Firestore.getInstance
export const useConfigService: () => IConfigService = Config.getInstance
