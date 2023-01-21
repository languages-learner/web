<script lang="ts" setup>
import { useAuthenticationService } from '@/plugins/services'
import { EAuthenticationProvider } from '@/services/authentication/EAuthenticationProvider'
import { EErrorType } from '@/enums/EErrorType'
import { useErrorLogStore } from '@/store/modules/errorLog'

const { addErrorLogInfo } = useErrorLogStore()
const {
    signInWithProvider,
} = useAuthenticationService()

const emit = defineEmits<{
    (e: 'error', error: string): void
}>()

const signInWithGoogle = () => signInWithProvider(EAuthenticationProvider.GOOGLE)
    .catch(e => {
        addErrorLogInfo({ type: EErrorType.AUTHENTICATE, message: e.message, detail: 'createUserWithEmailAndPassword' })
        emit('error', e)
    })
</script>

<template>
    <n-space
        class="authenticate-modal-providers"
        justify="center">
        <n-button
            @click="signInWithGoogle"
            class="authenticate-modal-providers__button"
            type="success"
            ghost>
            Google
        </n-button>
    </n-space>
</template>

<style lang="scss" scoped>
@import "styles/authenticate-modal-providers";
</style>
