<script setup lang="ts">
import WorkspaceHeader from '@/modules/workspace/components/WorkspaceHeader/WorkspaceHeader.vue'
</script>

<template>
    <WorkspaceHeader />
    <div class="workspace-layout">
        <div class="workspace-layout__content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "workspace-layout";
</style>
