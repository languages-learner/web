<route lang="yaml">
meta:
    requiresAuth: true
    layout: workspaceLayout
</route>

<script setup lang="ts">
import WordsContainer from '@/modules/words/components/WordsContainer.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const { isUserDataLoaded } = storeToRefs(useUserStore())
</script>

<template>
    <div class="dictionary">
        <WordsContainer v-if="isUserDataLoaded" />
    </div>
</template>

<style lang="scss" scoped>
@import "@/pages/styles/dictionary";
</style>
