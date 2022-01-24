<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useUser } from '@/plugins/services'

const userStore = useUserStore()
const { signOut } = useUser()
</script>

<template>
    <div class="header">
        <div class="header_email">{{ userStore.profileData?.email }}</div>
        <button class="header_button" @click="signOut">Sign out</button>
    </div>
</template>

<style scoped lang="scss">
@import "styles/Header/component";
</style>
