<script setup lang="ts">
import type { WordsFilters } from '@/modules/workspace/modules/words/types/WordsFilters'
const WordStatusIcon = defineAsyncComponent(() => import('@/modules/workspace/modules/words/components/WordStatus/WordStatusIcon.vue'))
import { useWordStatuses } from '@/modules/workspace/modules/words/composables/useWordStatuses'

const { isMobile } = useAppBreakpoints()
const { wordStatusLabel, wordStatusOptionsWithAll, getWordStatusesValues } = useWordStatuses()

const currentStatus = defineModel<WordsFilters['status']>('status', { required: true })
const options = computed(() => unref(wordStatusOptionsWithAll).map(option => ({
    ...option,
    class: EDataTestClass.words_container_header_status,
})))
const isSelectedStatus = (status: WordsFilters['status']) => currentStatus.value === status
const updateStatus = (value: WordsFilters['status']) => {
    currentStatus.value = value
}
</script>

<template>
    <n-button-group v-if="!isMobile">
        <n-button
            @click="() => updateStatus(-1)"
            :secondary="isSelectedStatus(-1)"
            class="words-container-header-statuses__item"
            :data-test="EDataTest.words_container_header_status"
            :class="{[EDataTestClass.words_container_header_status_active]: isSelectedStatus(-1)}"
        >
            {{ $t('all') }}
        </n-button>
        <n-button
            v-for="(wordStatus, index) in getWordStatusesValues()"
            :key="`words-container-header-status-${index}`"
            @click="() => updateStatus(wordStatus)"
            class="words-container-header-statuses__item"
            :data-test="EDataTest.words_container_header_status"
            :class="{[EDataTestClass.words_container_header_status_active]: isSelectedStatus(wordStatus)}"
            :secondary="isSelectedStatus(wordStatus)"
            :aria-label="wordStatusLabel[wordStatus]"
        >
            <template #icon>
                <WordStatusIcon :status="wordStatus" />
            </template>
        </n-button>
    </n-button-group>
    <n-select
        v-else
        v-model:value="currentStatus"
        :data-test="EDataTest.words_container_header_status"
        :options="options"
        :consistent-menu-width="false"
    />
</template>
