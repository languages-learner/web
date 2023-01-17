<script setup lang="ts">
import WorkspaceHeader from '@/components/WorkspaceHeader.vue'
</script>

<template>
    <WorkspaceHeader />
    <div class="workspace-layout">
        <div class="workspace-layout_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "styles/workspace-layout";
</style>
