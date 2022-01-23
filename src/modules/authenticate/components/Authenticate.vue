<script setup lang="ts">
import { computed, PropType, reactive } from 'vue'
import { useFirebaseAuthentication, useUser } from '@/plugins/services'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'

const props = defineProps({
    type: {
        type: String as PropType<'signin' | 'signup'>,
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
    'signin': 'Login',
    'signup': 'Registration'
}[props.type]))

const submitName = computed(() => ({
    'signin': 'Login',
    'signup': 'Registration'
}[props.type]))

const submit = props.type === 'signin' ? signInWithEmailAndPassword : createUserWithEmailAndPassword
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

        <template v-if="type === 'signin'">
            <div
                class="form-identity_have-account"
            >
                <span>Do not have an account?</span>
                <router-link
                    tag="span"
                    :to="{ name: 'signup' }"
                >Register here
                </router-link>
            </div>
        </template>

        <template v-if="type === 'signup'">
            <div
                class="form-identity_have-account"
            >
                Do you have an account?
                <router-link
                    tag="span"
                    :to="{ name: 'signin' }"
                >Login here
                </router-link>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.form-identity {
    align-items: center;
    max-width: 450px;
    height: 100vh;
    margin-right: auto;
    margin-left: auto;


    &_container {
        margin: 0 0 10px;
        padding: 20px;
        border: 1px solid #dbdbdb;
    }

    &_input {
        width: 100%;
        text-align: center;
    }

    &_input + &_input {
        margin-top: 5px;
    }

    &_error {
        margin-top: 10px;
        color: red;
    }

    &_submit {
        margin-top: 10px;
    }

    &_have-account {
        margin-top: 30px;

        a {
            margin-left: 15px;
        }
    }
}

.divider {
    display: flex;
    flex-direction: row;
    margin: 18px 40px;

    .line {
        position: relative;
        top: 0.45em;
        width: 30%;
        height: 1px;
        background-color: #dbdbdb;
    }
    .text {
        width: 40%;
        margin: 0 18px;
        color: #8e8e8e;
        font-weight: 600;
        font-size: 13px;
        line-height: 15px;
        text-align: center;
        text-transform: uppercase;
    }
}
</style>
