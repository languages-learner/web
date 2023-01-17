<script setup lang="ts">
import { initializeOnAuthStateChangedHook } from '@/hooks/onAuthStateChanged'

initializeOnAuthStateChangedHook()
</script>

<template>
    <router-view></router-view>
</template>

<style>
#app {
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
