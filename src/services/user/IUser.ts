import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'

export interface IUser {
    signInWithProvider(provider: EAuthenticationProvider): Promise<void>
    signInWithEmailAndPassword(email: string, password: string): Promise<void>
    createUserWithEmailAndPassword(email: string, password: string): Promise<void>
    signOut(): Promise<void>
}
