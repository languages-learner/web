<script setup lang="ts">
import LandingHeader from '@/modules/landing/components/LandingHeader/LandingHeader.vue'
</script>

<template>
    <LandingHeader />
    <div class="landing-layout">
        <div class="landing-layout__content">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "landing-layout";
</style>
