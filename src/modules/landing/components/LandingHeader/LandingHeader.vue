<script setup lang="ts">
import {  useModal } from 'naive-ui'
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'
import InterfaceLanguageSelector from '@/components/InterfaceLanguageSelector/InterfaceLanguageSelector.vue'

const modal = useModal()
const { isLoggedIn } = storeToRefs(useUserStore())

const showAuthenticateModal = async (type: EAuthenticateModalType) => {
    const { useAuthenticateModal } = await import('@/modules/landing/modules/authenticate/components/AuthenticateModal/useAuthenticateModal')
    const { openAuthenticateModal } = useAuthenticateModal(modal)
    openAuthenticateModal(type)
}

onBeforeUnmount(() => {
    modal.destroyAll()
})
</script>

<template>
    <div class="landing-header">
        <n-space justify="end">
            <InterfaceLanguageSelector
                size="short"
                theme="green"/>
            <template v-if="!isLoggedIn">
                <n-button
                    @click="() => showAuthenticateModal(EAuthenticateModalType.SIGNIN)"
                    :data-test="EDataTest.landing_sign_in_button"
                    type="success">
                    {{ $t('sign_in') }}
                </n-button>
                <n-button
                    @click="() => showAuthenticateModal(EAuthenticateModalType.SIGNUP)"
                    :data-test="EDataTest.landing_sign_up_button"
                    type="success">
                    {{ $t('sign_up') }}
                </n-button>
            </template>
            <n-button
                v-else
                :data-test="EDataTest.landing_go_to_workspace_button"
                type="success">
                <router-link :to="{name: EPageName.DICTIONARY}">
                    {{ $t('go_to_workspace') }}
                </router-link>
            </n-button>
        </n-space>
    </div>
</template>

<style scoped lang="scss">
@import "landing-header";
</style>
