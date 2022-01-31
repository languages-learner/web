import firebase from 'firebase'
import { useRoute, useRouter } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { useUserStore } from '@/store/modules/user'

export const initializeOnAuthStateChangedHook = (): void => {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()

    firebase.auth().onAuthStateChanged(async (user) => {
        userStore.setUser(user)

        if (user) {
            if (route.name === PageEnum.BASE_SIGNIN || route.name === PageEnum.BASE_SIGNUP) {
                await router.replace({
                    name: PageEnum.BASE_HOME
                })
            }
        } else if (route.meta.requiresAuth) {
            await router.replace({
                name: PageEnum.BASE_SIGNIN
            })
        }
    })
}

