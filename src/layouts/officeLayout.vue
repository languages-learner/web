<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
    <AppHeader />
    <div class="office-layout">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
@import "styles/office-layout";
</style>
