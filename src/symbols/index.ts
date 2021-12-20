import { InjectionKey } from 'vue'

import { Authenticate } from '@/services/Authenticate'
import { Firestore } from '@/services/firestore/Firestore'

export const AuthenticateServiceKey: InjectionKey<Authenticate> = Symbol('AuthenticateService')
export const FirestoreServiceKey: InjectionKey<Firestore> = Symbol('FirestoreService')
