import firebase from 'firebase/app'
import 'firebase/auth'
import { IAuthentication } from '@/services/authentication/common/IAuthentication'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'
import {
    Ref,
    onBeforeMount,
    ref
} from 'vue'

export class FirebaseAuthentication implements IAuthentication {
    private static instance: FirebaseAuthentication

    public static getInstance() {
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

    private signInWithAuthProvider = (provider: firebase.auth.AuthProvider) =>
        firebase.auth().signInWithRedirect(provider)

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
        await firebase.auth().signOut()
    }

    public checkRedirectResult = async (): Promise<{
        success: boolean,
        error: string | undefined
    }> => {
        let success = false
        let error = undefined

        firebase.auth().getRedirectResult().then(() => {
            success = true
        }).catch(e => {
            error = this.getErrorMessage(e)
        })

        return {
            success,
            error
        }
    }

    // eslint-disable-next-line
    private getErrorMessage = (error: any) => {
        let { message } = error

        if (error.code === 'auth/account-exists-with-different-credential') {
            message = 'You have already signed up with a different auth provider for that email.'
        }

        return message
    }
}
