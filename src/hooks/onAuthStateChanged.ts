import { type Router } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/store/modules/user'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { EPageName } from '@/enums/EPageName'

export const initializeOnAuthStateChangedHook = (router: Router): void => {
    const route = router.currentRoute
    const { addErrorLogInfo } = useErrorLogStore()
    const userStore = useUserStore()

    onAuthStateChanged(getAuth(), async (user) => {
        await router.isReady()
        await userStore.setUser(user)

        if (unref(route).meta.requiresAuth && !userStore.isLoggedIn) {
            await router.replace({
                name: EPageName.LANDING,
            })
        }
    }, (e) => {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'onAuthStateChanged' })
    })
}

