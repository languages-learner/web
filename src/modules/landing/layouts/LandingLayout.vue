<script setup lang="ts">
import LandingAbout from '@/modules/landing/components/LandingAbout/LandingAbout.vue'
import LandingHeader from '@/modules/landing/components/LandingHeader/LandingHeader.vue'
</script>

<template>
    <div
        class="landing-layout"
        :data-test="EDataTest.landing_layout">
        <LandingHeader class="landing-layout__header" />
        <div class="landing-layout__content">
            <router-view></router-view>
        </div>
        <LandingAbout class="landing-layout__footer" />
    </div>
</template>

<style scoped lang="scss">
@import "landing-layout";
</style>
