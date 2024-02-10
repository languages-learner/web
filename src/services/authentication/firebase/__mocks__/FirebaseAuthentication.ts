import type { IAuthentication } from '@/services/authentication/common/IAuthentication'

export class FirebaseAuthentication implements IAuthentication {
    private static instance: FirebaseAuthentication

    public static getInstance(): IAuthentication {
        if (!FirebaseAuthentication.instance) {
            FirebaseAuthentication.instance = new FirebaseAuthentication()
        }

        return FirebaseAuthentication.instance
    }

    public createUserWithEmailAndPassword = async () => {}

    public signInWithEmailAndPassword = async () => {}

    private signInWithAuthProvider = async () => {}

    public signInWithProvider = async () => {}

    public signOut = async () => {}
}
