import firebase from 'firebase'
import { useUserStore } from '@/store/user'
import { onBeforeMount, ref, Ref } from 'vue'

export class Authenticate {
    constructor() {
        firebase.auth().useDeviceLanguage()
    }

    public signInWithProvider = (provider: firebase.auth.AuthProvider) =>
        firebase.auth().signInWithRedirect(provider)

    public signInWithEmailAndPassword = (email: string, password: string) =>
        firebase.auth().signInWithEmailAndPassword(email, password)

    public createUserWithEmailAndPassword = (email: string, password: string) =>
        firebase.auth().createUserWithEmailAndPassword(email, password)

    public signOut = () => firebase.auth().signOut()

    public useCheckRedirectResult = (): {
        loaded: Ref<boolean>,
        success: Ref<boolean>,
        error: Ref<string | undefined>
    } => {
        const loaded: Ref<boolean> = ref(false)
        const success: Ref<boolean> = ref(false)
        const error: Ref<string | undefined> = ref(undefined)

        const userStore = useUserStore()

        onBeforeMount(() => {
            firebase.auth().getRedirectResult().then(result => {
                success.value = true
                if (result.user) {
                    userStore.setUser(result.user)
                }
            }).catch(e => {
                error.value = this.getErrorMessage(e)
            }).finally(() => {
                loaded.value = true
            })
        })

        return {
            loaded,
            success,
            error
        }
    }

    // eslint-disable-next-line
    public getErrorMessage = (error: any) => {
        let { message } = error

        if (error.code === 'auth/account-exists-with-different-credential') {
            message = 'You have already signed up with a different auth provider for that email.'
        }

        return message
    }
}
