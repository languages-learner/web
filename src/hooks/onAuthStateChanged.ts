import firebase from 'firebase'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

export const initializeOnAuthStateChangedHook = (): void => {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()

    firebase.auth().onAuthStateChanged(async (user) => {
        userStore.setUser(user)

        if (user) {
            if (route.name === 'signin' || route.name === 'signup') {
                await router.replace({
                    name: 'index'
                })
            }
        }

        if (!user) {
            await router.replace({
                name: 'signin'
            })

            return
        }
    })
}

