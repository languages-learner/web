<script lang="ts" setup>
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'

const emit = defineEmits<{
    (e: 'signInWithProvider', provider: EAuthenticationProvider): void
}>()

const signInWithProvider = (provider: EAuthenticationProvider) => emit('signInWithProvider', provider)
</script>

<template>
    <n-space
        class="authenticate-modal-providers"
        justify="center">
        <n-button
            @click="() => signInWithProvider(EAuthenticationProvider.GOOGLE)"
            :data-test="EDataTest.authentication_modal_provider"
            class="authenticate-modal-providers__button"
            type="success"
            ghost>
            Google
        </n-button>
    </n-space>
</template>

<style lang="scss" scoped>
@import "authenticate-modal-providers";
</style>
