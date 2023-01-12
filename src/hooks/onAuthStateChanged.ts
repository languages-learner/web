import firebase from 'firebase/app'
import 'firebase/auth'
import { useRoute, useRouter } from 'vue-router'
import { EPageName } from '@/enums/EPageName'
import { useUserStore } from '@/store/modules/user'
import { watch } from 'vue'

export const initializeOnAuthStateChangedHook = (): void => {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()

    const handleChangeAuthState = async () => {
        if (userStore.isLoggedIn) {
            if (route.name === EPageName.SIGNIN || route.name === EPageName.SIGNUP) {
                await router.replace({
                    name: EPageName.BASE_HOME
                })
            }
        } else if (route.meta.requiresAuth) {
            await router.replace({
                name: EPageName.SIGNIN
            })
        }
    }

    /*
    * The first auth state change occurs before full initialization router.
    * At that moment route doesn't have name.
    * We need to check user access to current page one more time after initialization router.
    * */
    const unwatchInitRouter = watch(() => route.name, () => {
        unwatchInitRouter()
        handleChangeAuthState()
    })


    firebase.auth().onAuthStateChanged(async (user) => {
        userStore.setUser(user)
        await handleChangeAuthState()
    })
}

