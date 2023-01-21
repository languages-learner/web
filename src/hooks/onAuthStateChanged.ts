import firebase from 'firebase/app'
import 'firebase/auth'
import { unref } from 'vue'
import { type Router } from 'vue-router'
import { EPageName } from '@/enums/EPageName'
import { useUserStore } from '@/store/modules/user'
import { useErrorLogStoreWithOut } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'

export const initializeOnAuthStateChangedHook = (router: Router): void => {
    const route = router.currentRoute
    const { addErrorLogInfo } = useErrorLogStoreWithOut()

    firebase.auth().onAuthStateChanged(async (user) => {
        const userStore = useUserStore()
        await router.isReady()
        userStore.setUser(user)

        if (unref(route).meta.requiresAuth && !userStore.isLoggedIn) {
            await router.replace({
                name: EPageName.LANDING,
            })
        }
    }, (e) => {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'onAuthStateChanged' })
    })
}

