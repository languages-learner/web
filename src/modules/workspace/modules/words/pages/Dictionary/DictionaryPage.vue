<script setup lang="ts">
const WordsContainer = defineAsyncComponent(() => import('@/modules/workspace/modules/words/components/WordsContainer/WordsContainer.vue'))

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
