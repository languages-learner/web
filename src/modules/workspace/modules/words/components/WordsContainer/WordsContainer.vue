<script lang="ts" setup>
import WordsContainerHeader from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerHeader/WordsContainerHeader.vue'
import WordsContainerWordsList from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerWordsList/WordsContainerWordsList.vue'
import WordsContainerWordCreator from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerWordCreator/WordsContainerWordCreator.vue'
import { useProvideWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'

useProvideWordsContainerStore()
</script>

<template>
    <div
        class="words-container"
        :data-test="EDataTest.words_container">
        <WordsContainerHeader />
        <WordsContainerWordCreator class="words-container__word-creator" />
        <WordsContainerWordsList class="words-container__words-list" />
    </div>
</template>

<style lang="scss" scoped>
@import "words-container";
</style>
