<script setup lang="ts">
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
import WordStatusIcon from '@/modules/workspace/modules/words/components/WordStatus/WordStatusIcon.vue'
import { useAppBreakpoints } from '@/composables/useAppBreakpoints'
import { useWordStatuses } from '@/modules/workspace/modules/words/composables/useWordStatuses'

const { isMobile } = useAppBreakpoints()
const { wordStatusOptionsWithAll, getWordStatusesValues } = useWordStatuses()

const currentStatus = defineModel<WordsFilters['status']>('status')
const isSelectedStatus = (status: WordsFilters['status']) => currentStatus.value === status
const updateStatus = (value: WordsFilters['status']) => {
    currentStatus.value = value
}
</script>

<template>
    <n-button-group v-if="!isMobile">
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
    <n-select
        v-else
        v-model:value="currentStatus"
        :options="wordStatusOptionsWithAll"
        :consistent-menu-width="false"
    />
</template>
