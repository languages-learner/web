<script lang="ts" setup>
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import WordStatusIcon from '@/modules/workspace/modules/words/components/WordStatus/WordStatusIcon.vue'
import { getWordStatusesValues } from '@/services/dbstore/dto/Words'

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

const isSelectedStatus = (status: WordsFilters['status']) => filters.value.status === status
</script>

<template>
    <div class="words-container-header">
        <n-row
            align-items="center"
            justify-content="space-between">
            <n-col span="12">
                <n-row
                    align-items="center"
                    class="words-container-header__left-container">
                    <n-col span="2">
                        <n-checkbox
                            :checked="isAllWordsSelected"
                            :on-update:checked="toggleSelection">
                        </n-checkbox>
                    </n-col>
                    <n-col span="14">
                        <n-input

                            :on-update:value="updateText"
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
                            :key="`words-container-header-status-${index}`"
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
@import "words-container-header";
</style>
