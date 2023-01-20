<script lang="ts" setup>
import {
    NButton,
    NCard,
    NDivider,
    NForm,
    NFormItemRow,
    NInput,
    NModal,
    NTabPane,
    NTabs,
    NText
} from 'naive-ui'
import {
    onBeforeMount,
    reactive,
    ref,
    watch
} from 'vue'
import AuthenticateModalProviders from '@/modules/authenticate/components/AuthenticateModalProviders.vue'
import { useAuthenticationService } from '@/plugins/services'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'

const { addErrorLogInfo } = useErrorLogStore()

const props = defineProps<{
    type: 'signin' | 'signup'
    show: boolean
}>()

const authenticateType = ref(props.type)
watch(() => props.type, () => authenticateType.value = props.type)

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>()

const updateShow = (value: boolean) => emit('update:show', value)

const form = reactive({
    email: '',
    password: ''
})

const {
    signInWithEmailAndPassword: baseSignInWithEmailAndPassword,
    createUserWithEmailAndPassword: baseCreateUserWithEmailAndPassword,
    checkRedirectResult
} = useAuthenticationService()

const currentError = ref<string>()
const setCurrentError = (error: string | undefined) => currentError.value = error
onBeforeMount(async () => {
    try {
        const { success, error } = await checkRedirectResult()

        if (!success) {
            addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: error!, detail: 'checkRedirectResult' })
            setCurrentError(error)
        }
    } catch (e: any) {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'checkRedirectResult' })
        setCurrentError(e.message)
    }
})

const signInWithEmailAndPassword = () => baseSignInWithEmailAndPassword(form.email, form.password)
    .catch((e) => {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'signInWithEmailAndPassword' })
        setCurrentError(e)
    })

const createUserWithEmailAndPassword = () => baseCreateUserWithEmailAndPassword(form.email, form.password)
    .catch(e => {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'createUserWithEmailAndPassword' })
        setCurrentError(e)
    })
</script>

<template>
    <n-modal
        :show="props.show"
        :on-update:show="updateShow"
        transform-origin="center"
        class="authenticate-modal"
    >
        <n-card
            class="authenticate-modal__container"
            :title="$t('authentication')"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-tabs
                v-model:value="authenticateType"
                default-value="signin"
                size="large"
                animated
            >
                <n-tab-pane
                    name="signin"
                    :tab="$t('sign_in')">
                    <n-form>
                        <n-form-item-row :label="$t('email')">
                            <n-input
                                v-model="form.email"
                                placeholder=""/>
                        </n-form-item-row>
                        <n-form-item-row :label="$t('password')">
                            <n-input
                                v-model="form.password"
                                placeholder=""/>
                        </n-form-item-row>
                    </n-form>
                    <n-button
                        @click="signInWithEmailAndPassword"
                        type="primary"
                        block
                        secondary
                        strong>
                        {{ $t('sign_in') }}
                    </n-button>
                    <div class="authenticate-modal__error">
                        <n-text type="error">{{ currentError }}</n-text>
                    </div>
                    <n-divider />
                    <AuthenticateModalProviders
                        @error="setCurrentError"
                        class="authenticate-modal__providers"/>
                </n-tab-pane>
                <n-tab-pane
                    name="signup"
                    :tab="$t('sign_up')">
                    <n-form>
                        <n-form-item-row :label="$t('email')">
                            <n-input
                                v-model="form.email"
                                placeholder=""/>
                        </n-form-item-row>
                        <n-form-item-row :label="$t('password')">
                            <n-input
                                v-model="form.password"
                                placeholder=""/>
                        </n-form-item-row>
                    </n-form>
                    <n-button
                        @click="createUserWithEmailAndPassword"
                        type="primary"
                        block
                        secondary
                        strong>
                        {{ $t('sign_up') }}
                    </n-button>
                    <div class="authenticate-modal__error">
                        <n-text type="error">{{ currentError }}</n-text>
                    </div>
                    <n-divider />
                    <AuthenticateModalProviders
                        @error="setCurrentError"
                        class="authenticate-modal__providers" />
                </n-tab-pane>
            </n-tabs>
        </n-card>

    </n-modal>
</template>

<style lang="scss" scoped>
@import "styles/authenticate-modal";
</style>
