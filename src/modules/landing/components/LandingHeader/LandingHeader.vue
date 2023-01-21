<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { EPageName } from '@/enums/EPageName'
import { EAuthenticateModalType } from '@/modules/landing/modules/authenticate/components/AuthenticateModal/EAuthenticateModalType'
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
        <n-space
            justify="end"
            class="landing-header__menu">
            <template v-if="!isLoggedIn">
                <n-button
                    @click="() => showAuthenticateModal(EAuthenticateModalType.SIGNIN)"
                    type="success">
                    {{ $t('sign_in') }}
                </n-button>
                <n-button
                    @click="() => showAuthenticateModal(EAuthenticateModalType.SIGNUP)"
                    type="success">
                    {{ $t('sign_up') }}
                </n-button>
            </template>
            <n-button
                v-else
                type="success">
                <router-link :to="{name: EPageName.DICTIONARY}">
                    {{ $t('go_to_workspace') }}
                </router-link>
            </n-button>
        </n-space>
    </div>
    <AuthenticateModal
        v-model:show="isNeededToShowAuthenticateModal"
        :type="authenticateModalType"/>
</template>

<style scoped lang="scss">
@import "landing-header";
</style>
