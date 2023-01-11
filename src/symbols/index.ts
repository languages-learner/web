import { InjectionKey } from 'vue'

import { FirebaseAuthentication } from '@/services/authentication/firebase/FirebaseAuthentication'
import { IDbStore } from '@/services/dbstore/IDbStore'
import { IConfigService } from '@/services/configuration/IConfigService'

export const AuthenticationService: InjectionKey<FirebaseAuthentication> = Symbol('AuthenticationService')
export const DbStoreServiceKey: InjectionKey<IDbStore> = Symbol('DbStoreService')
export const ConfigServiceKey: InjectionKey<IConfigService> = Symbol('ConfigService')
