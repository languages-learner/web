<script lang="ts" setup>
import {
    NList,
    NListItem,
    NRow,
    NSpin
} from 'naive-ui'
import WordsListItem from '@/modules/words/components/WordsListItem.vue'
import { Word } from '@/modules/words/models/Words'

defineProps<{
    words: Array<[string, Word]>
    selectedWords: Record<string, boolean>
    isWordsLoaded: boolean
    isWordsLoading: boolean
}>()

const emit = defineEmits<{
    (e: 'deleteWord', word: string): void
    (e: 'updateWordStatus', word: string, status: Word['status']): void
    (e: 'toggleWordSelection', word: string): void
    (e: 'updateWordTranslations', word: string, translations: Word['translations']): void
}>()

const deleteWord = (word: string) => emit('deleteWord', word)
const updateWordStatus = (word: string, status: Word['status']) => emit('updateWordStatus', word, status)
const toggleWordSelection = (word: string) => emit('toggleWordSelection', word)
const updateWordTranslations = (word: string, translations: Word['translations']) => emit('updateWordTranslations', word, translations)
</script>

<template>
    <n-list>
        <template v-if="isWordsLoaded">
            <WordsListItem
                v-for="([word, wordData], index) in words"
                :key="index"
                @delete="() => deleteWord(word)"
                @updateStatus="(status) => updateWordStatus(word, status)"
                @toggleSelection="() => toggleWordSelection(word)"
                @updateTranslations="(translations) => updateWordTranslations(word, translations)"
                :word="word"
                :wordData="wordData"
                :isSelected="selectedWords[word] ?? false"
            />
        </template>
        <n-list-item v-if="!isWordsLoaded || isWordsLoading">
            <n-row justify-content="center">
                <n-spin size="large" />
            </n-row>
        </n-list-item>
    </n-list>
</template>
