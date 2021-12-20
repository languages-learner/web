<script setup lang="ts">
import { computed, reactive, PropType } from 'vue'
import firebase from 'firebase'
import { useAuthenticate } from '@/plugins/services'

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
    useCheckRedirectResult,
    signInWithProvider,
    signInWithEmailAndPassword: baseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword: baseCreateUserWithEmailAndPassword,
    getErrorMessage
} = useAuthenticate()

let { error } = useCheckRedirectResult()

const signInWithEmailAndPassword = () => baseSignInWithEmailAndPassword(form.email, form.password)
    .catch(e => {
        error.value = getErrorMessage(e)
    })

const createUserWithEmailAndPassword = () => baseCreateUserWithEmailAndPassword(form.email, form.password)
    .catch(e => {
        error.value = getErrorMessage(e)
    })

const signInWithGoogle = () => signInWithProvider(new firebase.auth.GoogleAuthProvider())

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
                <!--                <button class="form-identity_input" @click="signInWithProvider(new firebase.auth.FacebookAuthProvider())">-->
                <!--                    Facebook-->
                <!--                </button>-->
                <!--                <button class="form-identity_input" @click="signInWithProvider(new firebase.auth.GithubAuthProvider())">-->
                <!--                    Github-->
                <!--                </button>-->
                <!--                <button class="form-identity_input" @click="signInWithProvider(new firebase.auth.OAuthProvider('microsoft.com'))">-->
                <!--                    Microsoft-->
                <!--                </button>-->
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
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    align-items: center;


    &_container {
        border: 1px solid #dbdbdb;
        margin: 0 0 10px;
        padding: 20px;
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
        width: 30%;
        background-color: #dbdbdb;
        height: 1px;
        position: relative;
        top: 0.45em;
    }
    .text {
        width: 40%;
        color: #8e8e8e;
        font-size: 13px;
        font-weight: 600;
        line-height: 15px;
        margin: 0 18px;
        text-transform: uppercase;
        text-align: center;
    }
}
</style>
