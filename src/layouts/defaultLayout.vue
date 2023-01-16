<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
    <AppHeader />
    <div class="default-layout">
        <div class="default-layout_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "styles/default-layout";
</style>
