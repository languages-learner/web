<script setup lang="ts">
import WorkspaceHeader from '@/modules/workspace/components/WorkspaceHeader/WorkspaceHeader.vue'
const WorkspaceBottomMenu = defineAsyncComponent(() => import('@/modules/workspace/components/WorkspaceBottomMenu/WorkspaceBottomMenu.vue'))

const { isMobile } = useAppBreakpoints()
</script>

<template>
    <WorkspaceHeader />
    <div class="workspace-layout">
        <div
            class="workspace-layout__content"
            :data-test="EDataTest.workspace_content">
            <router-view></router-view>
        </div>
    </div>
    <WorkspaceBottomMenu v-if="isMobile" />
</template>

<style scoped lang="scss">
@import "workspace-layout";
</style>
