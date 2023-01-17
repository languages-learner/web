import firebase from 'firebase/app'
import 'firebase/auth'
import { useRoute, useRouter } from 'vue-router'
import { EPageName } from '@/enums/EPageName'
import { useUserStore } from '@/store/modules/user'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'

export const initializeOnAuthStateChangedHook = (): void => {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const { addErrorLogInfo } = useErrorLogStore()

    const handleChangeAuthState = async () => {
        if (route.meta.requiresAuth && !userStore.isLoggedIn) {
            await router.replace({
                name: EPageName.MAIN_PAGE
            })
        }
    }

    firebase.auth().onAuthStateChanged(async (user) => {
        await router.isReady()
        userStore.setUser(user)
        await handleChangeAuthState()
    }, (e) => {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'onAuthStateChanged' })
    })
}

