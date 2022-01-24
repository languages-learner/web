<script setup lang="ts">
const navItems = [{
    title: 'Home',
    name: 'index'
}, {
    title: 'Users',
    name: 'users'
}]
</script>

<template>
    <div class="navigation">
        <router-link
            v-for="(navItem, index) in navItems"
            :key="`nav-item-${index}`"
            :to="{name: navItem.name}"
        >
            {{ navItem.title }}
        </router-link>
    </div>
</template>

<style scoped lang="scss">
@import "styles/Navigation/component";
</style>
