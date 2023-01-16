<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
    <AppHeader />
    <div class="workspace-layout">
        <div class="workspace-layout_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "styles/workspace-layout";
</style>
