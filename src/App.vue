<script setup lang="ts">
import { initializeOnAuthStateChangedHook } from '@/hooks/onAuthStateChanged'

const router = useRouter()
initializeOnAuthStateChangedHook(router)
</script>

<template>
    <n-dialog-provider>
        <n-notification-provider
            placement="bottom-left"
            container-class="app-notifications">
            <n-modal-provider>
                <router-view></router-view>
            </n-modal-provider>
        </n-notification-provider>
    </n-dialog-provider>
</template>
