<script setup lang="ts">
import { computed, PropType, reactive } from 'vue'
import { useFirebaseAuthentication, useUser } from '@/plugins/services'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'
import { PageEnum } from '@/enums/pageEnum'

const props = defineProps({
    type: {
        type: String as PropType<PageEnum.BASE_SIGNIN | PageEnum.BASE_SIGNUP>,
        required: true
    }
})

const form = reactive({
    email: '',
    password: ''
})

const {
    signInWithProvider,
    signInWithEmailAndPassword: baseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword: baseCreateUserWithEmailAndPassword
} = useUser()

const { useCheckRedirectResult } = useFirebaseAuthentication()

let { error } = useCheckRedirectResult()

const signInWithEmailAndPassword = () => baseSignInWithEmailAndPassword(form.email, form.password)
    .catch((e) => {
        error.value = e
    })

const createUserWithEmailAndPassword = () => baseCreateUserWithEmailAndPassword(form.email, form.password)
    .catch(e => {
        error.value = e
    })

const signInWithGoogle = () => signInWithProvider(EAuthenticationProvider.GOOGLE)

const title = computed(() => ({
    [PageEnum.BASE_SIGNIN]: 'Login',
    [PageEnum.BASE_SIGNUP]: 'Registration'
}[props.type]))

const submitName = computed(() => ({
    [PageEnum.BASE_SIGNIN]: 'Login',
    [PageEnum.BASE_SIGNUP]: 'Registration'
}[props.type]))

const submit = props.type === PageEnum.BASE_SIGNIN ? signInWithEmailAndPassword : createUserWithEmailAndPassword
</script>

<template>
    <div class="form-identity">
        <h3>{{ title }}</h3>
        <div class="form-identity_container">
            <div>
                <button class="form-identity_input" @click="signInWithGoogle">
                    Google
                </button>
            </div>

            <div class="divider">
                <div class="line"></div>
                <div class="text">OR</div>
                <div class="line"></div>
            </div>

            <div class="form-identity_input">
                Email:
                <input
                    v-model="form.email"
                    type="email"
                    required
                />
            </div>

            <div class="form-identity_input">
                Password:
                <input
                    v-model="form.password"
                    type="password"
                    required
                />
            </div>

            <div
                v-if="error"
                class="form-identity_error"
            >
                <span>{{ error }}</span>
            </div>

            <button
                class="form-identity_submit"
                @click.prevent="submit"
            >
                {{ submitName }}
            </button>
        </div>

        <template v-if="type === PageEnum.BASE_SIGNIN">
            <div
                class="form-identity_have-account"
            >
                <span>Do not have an account?</span>
                <router-link
                    tag="span"
                    :to="{ name: PageEnum.BASE_SIGNUP }"
                >Register here
                </router-link>
            </div>
        </template>

        <template v-if="type === PageEnum.BASE_SIGNUP">
            <div
                class="form-identity_have-account"
            >
                Do you have an account?
                <router-link
                    tag="span"
                    :to="{ name: PageEnum.BASE_SIGNIN }"
                >Login here
                </router-link>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
@import "styles/Authenticate/component";
</style>
