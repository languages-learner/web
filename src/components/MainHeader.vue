<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import { EPageName } from '@/enums/EPageName'
import AuthenticateModal from '@/modules/authenticate/components/AuthenticateModal.vue'
import { ref } from 'vue'

const { isLoggedIn } = storeToRefs(useUserStore())

const authenticateModalType = ref<'signin' | 'signup'>('signin')
const isNeededToShowAuthenticateModal = ref(false)
const showAuthenticateModal = (type: 'signin' | 'signup') => {
    authenticateModalType.value = type
    isNeededToShowAuthenticateModal.value = true
}
</script>

<template>
    <div class="main-header">
        <n-space
            justify="end"
            class="mein-header-menu">
            <template v-if="!isLoggedIn">
                <n-button
                    @click="() => showAuthenticateModal('signin')"
                    type="success">
                    {{ $t('sign_in') }}
                </n-button>
                <n-button
                    @click="() => showAuthenticateModal('signup')"
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
@import "styles/main-header";
</style>
