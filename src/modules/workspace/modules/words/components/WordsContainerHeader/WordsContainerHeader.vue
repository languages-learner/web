<script lang="ts" setup>
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import WordsContainerHeaderStatuses from '@/modules/workspace/modules/words/components/WordsContainerHeader/WordsContainerHeaderStatuses/WordsContainerHeaderStatuses.vue'
import { EDataTest } from '@/enums/EDataTest'

defineProps<{
    isAllWordsSelected: boolean
    isAddWordButtonNeeded: boolean
}>()
const filters = defineModel<WordsFilters>('filters', { required: true })

const emit = defineEmits<{
    (e: 'update:filters', value: WordsFilters): void
    (e: 'toggleSelection'): void
    (e: 'addWord'): void
}>()

const updateText = (value: string) => {
    updateStatus(-1)
    filters.value.text = value
}
const updateStatus = (value: WordsFilters['status']) => {
    filters.value.status = value
}
const toggleSelection = () => emit('toggleSelection')
const addWord = () => emit('addWord')
</script>

<template>
    <div class="words-container-header">
        <n-grid cols="7 m:2">
            <n-grid-item span="5 m:1">
                <n-row
                    align-items="center"
                    class="words-container-header__left-container">
                    <n-col span="2">
                        <n-checkbox
                            :data-test="EDataTest.words_container_header_checkbox"
                            :checked="isAllWordsSelected"
                            :on-update:checked="toggleSelection">
                        </n-checkbox>
                    </n-col>
                    <n-col span="14">
                        <n-input
                            :on-update:value="updateText"
                            :value="filters.text"
                            :data-test="EDataTest.words_container_header_search"
                            class="words-container-header__search-input"
                            type="text"
                            :placeholder="$t('search')"
                            clearable />
                    </n-col>
                    <n-col
                        v-if="isAddWordButtonNeeded"
                        span="2">
                        <n-button
                            @click="addWord"
                            :data-test="EDataTest.words_container_header_add_word_button"
                            type="success"
                            strong
                            secondary>
                            {{ $t('add') }}
                        </n-button>
                    </n-col>
                </n-row>
            </n-grid-item>
            <n-grid-item span="2 m:1">
                <n-flex justify="end">
                    <WordsContainerHeaderStatuses v-model:status="filters.status"/>
                </n-flex>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@import "words-container-header";
</style>
