import firebase from 'firebase/app'
import 'firebase/auth'
import { useRoute, useRouter } from 'vue-router'
import { EPageName } from '@/enums/EPageName'
import { useUserStore } from '@/store/modules/user'

export const initializeOnAuthStateChangedHook = (): void => {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()

    firebase.auth().onAuthStateChanged(async (user) => {
        userStore.setUser(user)

        if (user) {
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
    })
}

