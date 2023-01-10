<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
    <div class="navigation">
        <router-link :to="{name: 'index'}">
            Home
        </router-link>
        <router-link v-if="userStore.isLoggedIn" :to="{name: 'users'}">
            Users
        </router-link>
        <router-link v-if="userStore.isLoggedIn" :to="{name: 'chat'}">
            Chat
        </router-link>
        <router-link v-if="!userStore.isLoggedIn" :to="{name: 'signin'}">
            Signin
        </router-link>
    </div>
</template>

<style scoped lang="scss">
@import "styles/navigation";
</style>
