<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import UserCreate from '@/modules/user/components/UserCreate.vue'
import UserList from '@/modules/user/components/UsersList.vue'
</script>

<template>
    <Navigation />
    <h3>Users list</h3>
    <UserCreate />
    <UserList />
</template>
