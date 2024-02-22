<script lang="ts" setup>
import AuthenticateModalForm from '@/modules/landing/modules/authenticate/components/AuthenticateModal/components/AuthenticateModalForm/AuthenticateModalForm.vue'
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'

const props = defineProps<{
    type: EAuthenticateModalType
    show: boolean
}>()

const { isMobile } = useAppBreakpoints()

const authenticateType = ref(props.type)
watch(() => props.type, () => authenticateType.value = props.type)

const modalStyle = computed(() => unref(isMobile)
    ? {
        width: '100vw',
        height: '100dvh',
    }
    : {
        width: '600px',
    })

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
        preset="card"
        size="huge"
        :title="$t('authentication')"
        :style="modalStyle"
        :data-test="EDataTest.authentication_modal"
    >
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
    </n-modal>
</template>
