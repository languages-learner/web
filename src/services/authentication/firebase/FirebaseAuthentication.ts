import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import type { IAuthentication } from '@/services/authentication/common/IAuthentication'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'
import { getErrorMessage } from '@/utils/error'

export class FirebaseAuthentication implements IAuthentication {
    private static instance: FirebaseAuthentication

    public static getInstance(): IAuthentication {
        if (!FirebaseAuthentication.instance) {
            FirebaseAuthentication.instance = new FirebaseAuthentication()
        }

        return FirebaseAuthentication.instance
    }

    constructor() {
        firebase.auth().useDeviceLanguage()
    }

    public createUserWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
            throw new Error(this.getErrorMessage(e))
        }
    }

    public signInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            throw new Error(this.getErrorMessage(e))
        }
    }

    private signInWithAuthProvider = async (provider: firebase.auth.AuthProvider) => {
        try {
            await firebase.auth().signInWithPopup(provider)
        } catch (e) {
            throw new Error(this.getErrorMessage(e))
        }
    }

    public signInWithProvider = async (provider: EAuthenticationProvider) => {
        let authProvider: firebase.auth.AuthProvider
        switch (provider) {
        case EAuthenticationProvider.GOOGLE: authProvider = new firebase.auth.GoogleAuthProvider()
        }

        if (authProvider) {
            await this.signInWithAuthProvider(authProvider)
        }
    }

    public signOut = async () => {
        try {
            await firebase.auth().signOut()
        } catch (e) {
            throw new Error(this.getErrorMessage(e))
        }
    }

    private getErrorMessage = (error: any) => {
        let message = getErrorMessage(error)

        if (error.code === 'auth/account-exists-with-different-credential') {
            message = 'You have already signed up with a different auth provider for that email.'
        }

        return message
    }
}
