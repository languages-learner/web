<script lang="ts" setup>
import AuthenticateModalForm from '@/modules/landing/modules/authenticate/components/AuthenticateModal/components/AuthenticateModalForm/AuthenticateModalForm.vue'
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'

const props = defineProps<{
    type: EAuthenticateModalType
}>()

const authenticateType = ref(props.type)
watch(() => props.type, () => authenticateType.value = props.type)
</script>

<template>
    <div :data-test="EDataTest.authentication_modal">
        <n-tabs
            v-model:value="authenticateType"
            :default-value="EAuthenticateModalType.SIGNIN"
            size="large"
            animated
        >
            <n-tab-pane
                :data-test="EDataTest.authentication_modal_sign_in_tab"
                :name="EAuthenticateModalType.SIGNIN"
                :tab="$t('sign_in')">
                <AuthenticateModalForm :type="EAuthenticateModalType.SIGNIN"/>
            </n-tab-pane>
            <n-tab-pane
                :data-test="EDataTest.authentication_modal_sign_up_tab"
                :name="EAuthenticateModalType.SIGNUP"
                :tab="$t('sign_up')">
                <AuthenticateModalForm :type="EAuthenticateModalType.SIGNUP"/>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
