import type { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'

export interface IAuthentication {
    signInWithProvider(provider: EAuthenticationProvider): Promise<void>
    signInWithEmailAndPassword(email: string, password: string): Promise<void>
    createUserWithEmailAndPassword(email: string, password: string): Promise<void>
    signOut(): Promise<void>
}
