<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui'
import { useAuthenticationService } from '@/plugins/services'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'

const {
    signInWithProvider,
} = useAuthenticationService()

const signInWithGoogle = () => signInWithProvider(EAuthenticationProvider.GOOGLE)
</script>

<template>
    <n-space
        class="authenticate-modal-providers"
        justify="center">
        <n-button
            @click="signInWithGoogle"
            class="authenticate-modal-providers_button"
            type="success"
            ghost>
            Google
        </n-button>
    </n-space>
</template>

<style lang="scss" scoped>
@import "styles/authenticate-modal-providers";
</style>
