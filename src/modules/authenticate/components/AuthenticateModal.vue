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

onBeforeMount(async () => {
    const { error } = await checkRedirectResult()
    currentError.value = error
})

const signInWithEmailAndPassword = () => baseSignInWithEmailAndPassword(form.email, form.password)
    .catch((e) => {
        currentError.value = e
    })

const createUserWithEmailAndPassword = () => baseCreateUserWithEmailAndPassword(form.email, form.password)
    .catch(e => {
        currentError.value = e
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
            class="authenticate-modal_content"
            :title="$t('authentication')"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <n-tabs
                v-model:value="authenticateType"
                class="card-tabs"
                default-value="signin"
                size="large"
                animated
                pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
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
                    <div class="authenticate-modal_error">
                        <n-text type="error">{{ currentError }}</n-text>
                    </div>
                    <n-divider />
                    <AuthenticateModalProviders class="authenticate-modal_providers" />
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
                    <div class="authenticate-modal_error">
                        <n-text type="error">{{ currentError }}</n-text>
                    </div>
                    <n-divider />
                    <AuthenticateModalProviders class="authenticate-modal_providers" />
                </n-tab-pane>
            </n-tabs>
        </n-card>

    </n-modal>
</template>

<style lang="scss" scoped>
@import "styles/authenticate-modal";
</style>
