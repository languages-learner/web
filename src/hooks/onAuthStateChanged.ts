import firebase from 'firebase'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/store/user'

export const initializeOnAuthStateChangedHook= (): void => {
    let initChange = false

    onBeforeMount(() => {
        const route = useRoute()
        const router = useRouter()
        const userStore = useUserStore()

        firebase.auth().onAuthStateChanged((user) => {
            userStore.setUser(user)

            if (user) {
                if (route.name === 'signin' || route.name === 'signup') {
                    router.replace({
                        name: 'index'
                    })
                }
            }

            if (!initChange) {
                initChange = true

                return
            }

            if (!user) {
                router.replace({
                    name: 'signin'
                })

                return
            }
        })
    })
}

