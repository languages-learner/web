<script setup lang="ts">
import Header from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
</script>

<template>
    <Header />
    <Navigation />
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
.content {
    margin-top: 20px;
}
</style>
