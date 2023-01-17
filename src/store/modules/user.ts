import { defineStore, skipHydrate } from 'pinia'
import {
    computed,
    ref,
    unref
} from 'vue'
import type firebase from 'firebase'
import { store } from '@/store'
import { useDbStore } from '@/plugins/services'
import { useConfigStore } from '@/store/modules/config'
import { useInterfaceLanguageStore } from '@/store/modules/interfaceLanguage'
import { BASE_INTERFACE_LANGUAGE } from '@/const/BaseInterfaceLanguage'
import type User from '@/models/User'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'

type StateForAuthorizedUser = {
    profileData: {
        uid: string,
        displayName: string | null,
        email: string | null,
        emailVerified: boolean,
        photoURL: string | null,
        isAnonymous: boolean,
    }
    customData: Omit<User, 'id'>
}

type StateForNotAuthorizedUser = {
    profileData: undefined
    customData: undefined
}

export type State = StateForAuthorizedUser | StateForNotAuthorizedUser

export const useUserStore = defineStore('user', () => {
    const { addErrorLogInfo } = useErrorLogStore()
    const { userCollection } = useDbStore()
    const { getTranslatedLanguageName } = useConfigStore()
    const { setInterfaceLanguage } = useInterfaceLanguageStore()

    const isUserDataLoaded = ref(false)
    const profileData = ref<State['profileData']>(undefined)
    const customData = ref<State['customData']>(undefined)

    const isLoggedIn = computed(() => unref(profileData) !== undefined)
    const activeLearningLanguageName = computed(() =>
        getTranslatedLanguageName(unref(customData)?.activeLearningLanguage ?? BASE_INTERFACE_LANGUAGE)
    )

    const createBaseCustomData = (): StateForAuthorizedUser['customData'] => {
        const { languagesAvailableForLearning, interfaceLanguages } = useConfigStore()

        return {
            nativeLanguage: languagesAvailableForLearning[0],
            activeLearningLanguage: languagesAvailableForLearning[1],
            interfaceLanguage: interfaceLanguages[0]
        }
    }

    const uploadCustomData = async (needToCreate = false) => {
        if (!profileData.value || !customData.value) return

        try {
            if (needToCreate) {
                await userCollection.create(profileData.value.uid, customData.value)
            }

            await userCollection.create(profileData.value.uid, customData.value)
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.USER_STORE, message: e.message, detail: 'uploadCustomData' })
        }
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

        try {
            const userCustomData = await userCollection.get(user.uid)

            const baseCustomData = createBaseCustomData()

            if (!userCustomData) {
                customData.value = {
                    nativeLanguage: baseCustomData.nativeLanguage,
                    activeLearningLanguage: baseCustomData.activeLearningLanguage,
                    interfaceLanguage: baseCustomData.interfaceLanguage
                }

                await uploadCustomData(true)
            } else {
                customData.value = {
                    nativeLanguage: userCustomData.nativeLanguage ?? baseCustomData.nativeLanguage,
                    activeLearningLanguage: userCustomData.activeLearningLanguage ?? baseCustomData.activeLearningLanguage,
                    interfaceLanguage: userCustomData.interfaceLanguage ?? baseCustomData.interfaceLanguage,
                }
            }

            await setInterfaceLanguage(customData.value.interfaceLanguage)
            isUserDataLoaded.value = true
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.USER_STORE, message: e.message, detail: 'setUser' })
        }
    }

    const updateActiveLearningLanguage = async (languageId: number) => {
        if (!customData.value) return

        customData.value.activeLearningLanguage = languageId
        await uploadCustomData()
    }

    const updateInterfaceLanguage = async (languageId: number) => {
        if (!customData.value) return

        customData.value.interfaceLanguage = languageId
        await uploadCustomData()
    }

    const updateNativeLanguage = async (languageId: number) => {
        if (!customData.value) return

        customData.value.nativeLanguage = languageId
        await uploadCustomData()
    }

    return {
        isUserDataLoaded: skipHydrate(isUserDataLoaded),
        profileData,
        customData,
        isLoggedIn: skipHydrate(isLoggedIn),
        activeLearningLanguageName,
        setUser,
        updateActiveLearningLanguage,
        updateInterfaceLanguage,
        updateNativeLanguage
    }
})

export function useUserStoreWithOut() {
    return useUserStore(store)
}
