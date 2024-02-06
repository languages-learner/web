<script lang="ts" setup>
import { useNotification } from 'naive-ui'
import { EPageName } from '@/enums/EPageName'
import { type EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'
import AuthenticateModalProviders from '@/modules/landing/modules/authenticate/components/AuthenticateModal/components/AuthenticateModalProviders/AuthenticateModalProviders.vue'
import { useAuthenticationService } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'

const { t } = useI18n()
const { addErrorLogInfo } = useErrorLogStore()
const notification = useNotification()
const router = useRouter()

const props = defineProps<{
    type: EAuthenticateModalType
}>()

const form = reactive({
    email: '',
    password: '',
})

const {
    signInWithEmailAndPassword: baseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword: baseCreateUserWithEmailAndPassword,
    signInWithProvider: baseSignInWithProvider,
} = useAuthenticationService()

const currentError = ref<string>()
const setCurrentError = (error: Error) => currentError.value = error.message

const successAuthenticateHandler = () => {
    notification.success({
        content: props.type === EAuthenticateModalType.SIGNIN ? t('successful_authorization') : t('successful_registration'),
        duration: 2500,
        keepAliveOnHover: true,
    })
    router.push({ name: EPageName.DICTIONARY })
}

const failAuthenticateHandler = (error: Error, detail: string) => {
    notification.error({
        content: props.type === EAuthenticateModalType.SIGNIN ? t('authorization_error') : t('registration_error'),
        meta: error.message,
        duration: 2500,
        keepAliveOnHover: true,
    })

    addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: error.message, detail })
    setCurrentError(error)
}

const signInWithEmailAndPassword = () => baseSignInWithEmailAndPassword(form.email, form.password)
    .then(successAuthenticateHandler)
    .catch(error => failAuthenticateHandler(error, 'signInWithEmailAndPassword'))

const createUserWithEmailAndPassword = () => baseCreateUserWithEmailAndPassword(form.email, form.password)
    .then(successAuthenticateHandler)
    .catch(error => failAuthenticateHandler(error, 'createUserWithEmailAndPassword'))

const signInWithProvider = (provider: EAuthenticationProvider) => baseSignInWithProvider(provider)
    .then(successAuthenticateHandler)
    .catch(error => failAuthenticateHandler(error, 'signInWithProvider'))

const action = computed(() => {
    switch (props.type) {
    case EAuthenticateModalType.SIGNIN: return {
        text: t('sign_in'),
        handler: signInWithEmailAndPassword,
    }
    case EAuthenticateModalType.SIGNUP: return {
        text: t('sign_up'),
        handler: createUserWithEmailAndPassword,
    }
    }

    return undefined
})
</script>

<template>
    <n-form>
        <n-form-item-row :label="$t('email')">
            <n-input
                v-model:value="form.email"
                :placeholder="$t('email')"/>
        </n-form-item-row>
        <n-form-item-row :label="$t('password')">
            <n-input
                v-model:value="form.password"
                type="password"
                show-password-on="mousedown"
                :placeholder="$t('password')"/>
        </n-form-item-row>
    </n-form>
    <n-button
        @click="action?.handler"
        type="primary"
        block
        secondary
        strong>
        {{ action?.text }}
    </n-button>
    <div class="authenticate-modal-form__error">
        <n-text type="error">{{ currentError }}</n-text>
    </div>
    <n-divider />
    <AuthenticateModalProviders
        @signInWithProvider="signInWithProvider"
        class="authenticate-modal-form__providers"/>
</template>

<style lang="scss" scoped>
@import "authenticate-modal-form";
</style>
