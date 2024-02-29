<script setup lang="ts">
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'
import InterfaceLanguageSelector from '@/components/InterfaceLanguageSelector/InterfaceLanguageSelector.vue'
import AuthenticateModal from '@/modules/landing/modules/authenticate/components/AuthenticateModal/AuthenticateModal.vue'

const { isLoggedIn } = storeToRefs(useUserStore())

const authenticateModalType = ref<EAuthenticateModalType>(EAuthenticateModalType.SIGNIN)
const isNeededToShowAuthenticateModal = ref(false)

const showAuthenticateModal = (type: EAuthenticateModalType) => {
    authenticateModalType.value = type
    isNeededToShowAuthenticateModal.value = true
}
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
        <AuthenticateModal
            v-model:show="isNeededToShowAuthenticateModal"
            :type="authenticateModalType"/>
    </div>
</template>

<style scoped lang="scss">
@import "landing-header";
</style>
