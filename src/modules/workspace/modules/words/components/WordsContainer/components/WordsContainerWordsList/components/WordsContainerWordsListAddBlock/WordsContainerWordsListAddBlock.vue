<script setup lang="ts">
import { useWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'
import WordsContainerAddWordButton from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerAddWordButton/WordsContainerAddWordButton.vue'

const {
    wordsFilters,
} = useWordsContainerStore()
</script>

<template>
    <n-alert
        :show-icon="false"
        type="success">
        <n-flex
            justify="space-between"
            align="center">
            <div>{{ $t('new_word:') }}</div>
            <n-input
                data-test-blackout
                :value="wordsFilters.formattedText"
                disabled
                class="words-container-words-list-add-block__input"/>
            <WordsContainerAddWordButton />
        </n-flex>
    </n-alert>
</template>

<style scoped lang="scss">
@import "words-container-words-list-add-block";
</style>
