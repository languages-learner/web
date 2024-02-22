import { type Router } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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

