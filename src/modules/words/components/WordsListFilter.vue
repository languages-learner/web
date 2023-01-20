<script lang="ts" setup>
import {
    NButton,
    NButtonGroup,
    NCheckbox,
    NCol,
    NInput,
    NRow,
} from 'naive-ui'
import WordStatusIcon from '@/modules/words/components/WordStatus/WordStatusIcon.vue'
import { getWordStatusesValues } from '@/modules/words/enums/EWordStatus'
import type { WordsFilters } from '@/modules/words/types/WordsFilters'
import { computed } from 'vue'
import { Word } from '@/modules/words/models/Words'

const props = defineProps<{
    text: string,
    status: Word['status']
    isAllWordsSelected: boolean
    hasFilteredWord: boolean
}>()

const emit = defineEmits<{
    (e: 'update:text', value: string): void
    (e: 'update:status', value: Word['status']): void
    (e: 'toggleSelection'): void
    (e: 'addWord'): void
}>()

const updateText = (value: string) => emit('update:text', value)
const updateStatus = (value: Word['status']) => emit('update:status', value)
const toggleSelection = () => emit('toggleSelection')
const addWord = () => emit('addWord')

const isSelectedStatus = (status: WordsFilters['status']) => props.status === status

const isAddWordButtonNeeded = computed(() => !props.hasFilteredWord)
</script>

<template>
    <div class="words-list-filter">
        <n-row
            align-items="center"
            justify-content="space-between">
            <n-col span="12">
                <n-row
                    align-items="center"
                    class="words-list-filter__left-container">
                    <n-col span="2">
                        <n-checkbox
                            :checked="props.isAllWordsSelected"
                            :on-update:checked="toggleSelection">
                        </n-checkbox>
                    </n-col>
                    <n-col span="14">
                        <n-input
                            :value="props.text"
                            :on-update:value="(value) => updateText(value)"
                            class="words-list-filter__search-input"
                            type="text"
                            :placeholder="$t('search')"
                            clearable />
                    </n-col>
                    <n-col
                        v-if="isAddWordButtonNeeded"
                        span="2">
                        <n-button
                            @click="addWord"
                            type="success"
                            strong
                            secondary>
                            {{ $t('add') }}
                        </n-button>
                    </n-col>
                </n-row>
            </n-col>
            <n-col>
                <n-row justify-content="end">
                    <n-button-group>
                        <n-button
                            @click="() => updateStatus(-1)"
                            :secondary="isSelectedStatus(-1)">
                            {{ $t('all') }}
                        </n-button>
                        <n-button
                            v-for="(wordStatus, index) in getWordStatusesValues()"
                            :key="`words-filter-status-${index}`"
                            @click="() => updateStatus(wordStatus)"
                            :secondary="isSelectedStatus(wordStatus)"
                        >
                            <template #icon>
                                <WordStatusIcon :status="wordStatus" />
                            </template>
                        </n-button>
                    </n-button-group>
                </n-row>
            </n-col>
        </n-row>
    </div>
</template>

<style lang="scss" scoped>
@import "styles/words-list-filter";
</style>
