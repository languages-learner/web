import { defineStore, StoreDefinition } from 'pinia'
import firebase from 'firebase'
import { store } from '@/store'

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

type UserStore = StoreDefinition<'user',
    State, {
    isLoggedIn: boolean,
}, {
    setUser: (user: firebase.User | null) => void,
}>

export const useUserStore: UserStore = defineStore('user', {
    state: () => ({
        profileData: undefined,
    } as State),
    getters: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isLoggedIn: (state) => state.profileData !== undefined
    },
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

export function useUserStoreWithOut() {
    return useUserStore(store)
}
