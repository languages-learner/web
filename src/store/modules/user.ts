import { defineStore } from 'pinia'
import type firebase from 'firebase'
import { store } from '@/store'
import { useDbStore, useConfig } from '@/plugins/services'
import { computed, ref, unref } from 'vue'

type StateForAuthorizedUser = {
    profileData: {
        uid: string,
        displayName: string | null,
        email: string | null,
        emailVerified: boolean,
        photoURL: string | null,
        isAnonymous: boolean,
    }
    customData: {
        activeLearningLanguage: number
    }
}

type StateForNotAuthorizedUser = {
    profileData: undefined
    customData: undefined
}

export type State = StateForAuthorizedUser | StateForNotAuthorizedUser

export const useUserStore = defineStore('user', () => {
    const { userCollection } = useDbStore()

    const profileData = ref<State['profileData']>(undefined)
    const customData = ref<State['customData']>(undefined)

    const isLoggedIn = computed(() => unref(profileData) !== undefined)

    const createBaseCustomData = (): StateForAuthorizedUser['customData'] => {
        const config = useConfig()

        return {
            activeLearningLanguage: config.languagesAvailableForLearning[0].id
        }
    }

    const uploadCustomData = async () => {
        if (!profileData.value || !customData.value) return

        await userCollection.update(profileData.value.uid, customData.value)
    }

    const setUser = async (user: firebase.User | null) => {
        if (!user) {
            profileData.value = undefined

            return
        }

        profileData.value = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            photoURL: user.photoURL
        }

        const userCustomData = await userCollection.get(user.uid)

        const baseCustomData = createBaseCustomData()

        if (!userCustomData) {
            customData.value = {
                activeLearningLanguage: baseCustomData.activeLearningLanguage
            }

            await uploadCustomData()
        } else {
            customData.value = {
                activeLearningLanguage: userCustomData.activeLearningLanguage ?? baseCustomData.activeLearningLanguage
            }
        }
    }

    const updateActiveLearningLanguage = async (id: number) => {
        if (!customData.value) return

        customData.value.activeLearningLanguage = id
        await uploadCustomData()
    }

    return {
        profileData,
        customData,
        isLoggedIn,
        setUser,
        updateActiveLearningLanguage
    }
})

export function useUserStoreWithOut() {
    return useUserStore(store)
}
