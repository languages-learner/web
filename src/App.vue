<script setup lang="ts">
import { initializeOnAuthStateChangedHook } from '@/hooks/onAuthStateChanged'

const router = useRouter()
initializeOnAuthStateChangedHook(router)
</script>

<template>
    <n-notification-provider
        placement="bottom-left"
        container-class="app_notifications">
        <router-view></router-view>
    </n-notification-provider>
</template>
