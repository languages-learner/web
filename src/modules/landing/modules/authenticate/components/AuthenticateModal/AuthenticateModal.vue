<script lang="ts" setup>
import AuthenticateModalForm from '@/modules/landing/modules/authenticate/components/AuthenticateModal/components/AuthenticateModalForm/AuthenticateModalForm.vue'
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'

const props = defineProps<{
    type: EAuthenticateModalType
    show: boolean
}>()

const authenticateType = ref(props.type)
watch(() => props.type, () => authenticateType.value = props.type)

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>()

const updateShow = (value: boolean) => emit('update:show', value)
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
                :default-value="EAuthenticateModalType.SIGNIN"
                size="large"
                animated
            >
                <n-tab-pane
                    :name="EAuthenticateModalType.SIGNIN"
                    :tab="$t('sign_in')">
                    <AuthenticateModalForm :type="EAuthenticateModalType.SIGNIN"/>
                </n-tab-pane>
                <n-tab-pane
                    :name="EAuthenticateModalType.SIGNUP"
                    :tab="$t('sign_up')">
                    <AuthenticateModalForm :type="EAuthenticateModalType.SIGNUP"/>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </n-modal>
</template>

<style lang="scss" scoped>
@import "authenticate-modal";
</style>
