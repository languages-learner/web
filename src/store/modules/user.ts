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
import { useI18n } from 'vue-i18n'
import { BASE_INTERFACE_LANGUAGE } from '@/const/BaseInterfaceLanguage'

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
        activeLearningLanguage: number,
        interfaceLanguage: string
    }
}

type StateForNotAuthorizedUser = {
    profileData: undefined
    customData: undefined
}

export type State = StateForAuthorizedUser | StateForNotAuthorizedUser

export const useUserStore = defineStore('user', () => {
    const { userCollection } = useDbStore()
    const { languagesAvailableForLearning } = useConfigStore()
    const { setInterfaceLanguage } = useInterfaceLanguageStore()
    const { t } = useI18n()

    const isUserDataLoaded = ref(false)
    const profileData = ref<State['profileData']>(undefined)
    const customData = ref<State['customData']>(undefined)

    const isLoggedIn = computed(() => unref(profileData) !== undefined)
    const activeLearningLanguageName = computed(() =>
        t(`language.${languagesAvailableForLearning.find(lng => lng.id === unref(customData)?.activeLearningLanguage)?.name ?? BASE_INTERFACE_LANGUAGE}`)
    )

    const createBaseCustomData = (): StateForAuthorizedUser['customData'] => {
        const config = useConfigStore()

        return {
            activeLearningLanguage: config.languagesAvailableForLearning[0].id,
            interfaceLanguage: config.interfaceLanguages[0]
        }
    }

    const uploadCustomData = async (needToCreate = false) => {
        if (!profileData.value || !customData.value) return

        if (needToCreate) {
            await userCollection.create(profileData.value.uid, customData.value)
        }

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
                activeLearningLanguage: baseCustomData.activeLearningLanguage,
                interfaceLanguage: baseCustomData.interfaceLanguage
            }

            await uploadCustomData(true)
        } else {
            customData.value = {
                activeLearningLanguage: userCustomData.activeLearningLanguage ?? baseCustomData.activeLearningLanguage,
                interfaceLanguage: userCustomData.interfaceLanguage ?? baseCustomData.interfaceLanguage,
            }
        }

        await setInterfaceLanguage(customData.value.interfaceLanguage)
        isUserDataLoaded.value = true
    }

    const updateActiveLearningLanguage = async (id: number) => {
        if (!customData.value) return

        customData.value.activeLearningLanguage = id
        await uploadCustomData()
    }

    const updateInterfaceLanguage = async (language: string) => {
        if (!customData.value) return

        customData.value.interfaceLanguage = language
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
        updateInterfaceLanguage
    }
})

export function useUserStoreWithOut() {
    return useUserStore(store)
}
