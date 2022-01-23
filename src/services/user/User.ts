import { IAuthentication } from '@/services/authentication/IAuthentication'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'
import { IUser } from '@/services/user/IUser'

export class User implements IUser {
    constructor(private authenticationService: IAuthentication) {
    }

    public createUserWithEmailAndPassword = (email: string, password: string) => {
        return this.authenticationService.createUserWithEmailAndPassword(email, password)
    }

    public signInWithEmailAndPassword = (email: string, password: string) => {
        return this.authenticationService.signInWithEmailAndPassword(email, password)
    }

    public signInWithProvider = (provider: EAuthenticationProvider) => {
        return this.authenticationService.signInWithProvider(provider)
    }

    public signOut = () => {
        return this.authenticationService.signOut()
    }
}
