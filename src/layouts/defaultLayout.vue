<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
    <AppHeader />
    <div class="default-layout">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
@import "styles/default-layout";
</style>
