<script setup lang="ts">
import { initializeOnAuthStateChangedHook } from '@/hooks/onAuthStateChanged'

initializeOnAuthStateChangedHook()
</script>

<template>
    <router-view></router-view>
</template>
