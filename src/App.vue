<script setup lang="ts">
import { initializeOnAuthStateChangedHook } from '@/hooks/onAuthStateChanged'
import { initializeAuthenticateMiddleware } from '@/middlewares/authenticate'

initializeOnAuthStateChangedHook()
initializeAuthenticateMiddleware()
</script>

<template>
    <router-view></router-view>
</template>
