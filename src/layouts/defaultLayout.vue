<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
</script>

<template>
    <MainHeader />
    <div class="default-layout">
        <div class="default-layout_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "styles/default-layout";
</style>
