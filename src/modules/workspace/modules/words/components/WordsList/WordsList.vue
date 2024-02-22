<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import VirtualList from 'vue3-virtual-scroll-list'
import type { Word, Words } from '@/services/dbstore/dto/Words'
import WordsListItem from '@/modules/workspace/modules/words/components/WordsList/components/WordsListItem/WordsListItem.vue'

const props = defineProps<{
    words: Words
    selectedWords: Map<string, boolean>
    isWordsLoaded: boolean
    isWordsLoading: boolean
}>()

const emit = defineEmits<{
    (e: 'reachBottom'): void
    (e: 'deleteWord', word: string): void
    (e: 'updateWordStatus', word: string, status: Word['status']): void
    (e: 'toggleWordSelection', word: string): void
    (e: 'updateWordTranslations', word: string, translations: Word['translations']): void
}>()

const deleteWord = (word: string) => emit('deleteWord', word)
const updateWordStatus = (word: string, status: Word['status']) => emit('updateWordStatus', word, status)
const toggleWordSelection = (word: string) => emit('toggleWordSelection', word)
const updateWordTranslations = (word: string, translations: Word['translations']) => emit('updateWordTranslations', word, translations)

const items = computed(() => Array.from(props.words).map(([word, wordData]) => ({
    word,
    wordData,
    isSelected: props.selectedWords.get(word) ?? false,
})))
</script>

<template>
    <div class="words-list">
        <virtual-list
            v-if="!isWordsLoading && isWordsLoaded"
            @deleteWord="deleteWord"
            @updateWordStatus="updateWordStatus"
            @updateWordTranslations="updateWordTranslations"
            @toggleWordSelection="toggleWordSelection"
            data-key="word"
            :data-sources="items"
            :data-component="WordsListItem"
            :data-test="EDataTest.words_list"
            :estimate-size="77"
            :item-class="'words-list__item'"
            :page-mode="true"
        />
        <div
            v-else
            class="words-list__loader"
            :data-test="EDataTest.words_list_loader">
            <n-spin size="large" />
        </div>
    </div>
</template>

<style lang="scss">
@import "words-list";
</style>
