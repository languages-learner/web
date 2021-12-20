import { defineStore, Store } from 'pinia'
import firebase from 'firebase'

export interface State {
    profileData?: {
        uid: string,
        displayName: string | null,
        email: string | null,
        emailVerified: boolean,
        photoURL: string | null,
        isAnonymous: boolean,
    }
}

type UserStore = Store<'user',
    State,
    unknown, {
    setUser: (user: firebase.User | null) => void,
}>

export const useUserStore: () => UserStore = defineStore('user', {
    state: () => ({
        profileData: undefined,
    } as State),
    actions: {
        setUser(user) {
            if (!user) {
                this.profileData = undefined

                return
            }

            this.profileData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                photoURL: user.photoURL
            }
        },
    },
})
