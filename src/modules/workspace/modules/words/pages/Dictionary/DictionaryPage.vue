<script setup lang="ts">
import { storeToRefs } from 'pinia'
import WordsContainer from '@/modules/workspace/modules/words/components/WordsContainer/WordsContainer.vue'
import { useUserStore } from '@/store/modules/user'

const { isUserDataLoaded } = storeToRefs(useUserStore())
</script>

<template>
    <div class="dictionary">
        <WordsContainer v-if="isUserDataLoaded" />
    </div>
</template>

<style lang="scss" scoped>
@import "dictionary";
</style>
