<script lang="ts" setup>
import type { Word, Words } from '@/services/dbstore/dto/Words'
import WordsListItem from '@/modules/workspace/modules/words/components/WordsList/components/WordsListItem/WordsListItem.vue'

defineProps<{
    words: Words
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
                v-for="(wordData, word) of words"
                :key="`word-${word}`"
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
