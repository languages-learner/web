<script lang="ts" setup>
import WordsContainerHeaderStatuses from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerHeader/WordsContainerHeaderStatuses/WordsContainerHeaderStatuses.vue'
const WordsContainerAddWordButton =  defineAsyncComponent(() => import('@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerAddWordButton/WordsContainerAddWordButton.vue'))
import { EWordsContainerState, useWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'

const { isMobile } = useAppBreakpoints()
const {
    isWordsContainerState,

    wordsFilters,

    toggleAllWordsSelection,
    isAllWordsSelected,
} = useWordsContainerStore()

const isAddWordButtonNeeded = computed(() =>
    !unref(isMobile)
    && isWordsContainerState(EWordsContainerState.NOT_FOUND_WORD)
    && !isWordsContainerState(EWordsContainerState.FOUND_WORD_WITH_OTHER_STATUS)
    && (
        !isWordsContainerState(EWordsContainerState.LOADED_WITHOUT_WORDS)
        || isWordsContainerState(EWordsContainerState.FOUND_WORDS_WITH_OTHER_STATUSES)
    )
    && !isWordsContainerState(EWordsContainerState.ADDING_WORD),
)
const isAllWordsSelectedDisabled = computed(() => isWordsContainerState([
    EWordsContainerState.LOADED_WITHOUT_WORDS,
    EWordsContainerState.LOADING_WORDS,
]))

const updateText = (value: string) => {
    wordsFilters.status = -1
    wordsFilters.text = value
}
</script>

<template>
    <div
        class="words-container-header"
        :data-test="EDataTest.words_container_header">
        <n-grid cols="7 m:2">
            <n-grid-item span="5 m:1">
                <n-grid
                    cols="20"
                    class="words-container-header__left-container">
                    <n-grid-item cols="1">
                        <n-flex
                            align="center"
                            class="words-container-header__checkbox">
                            <n-checkbox
                                :aria-label="$t('select_all_words')"
                                :disabled="isAllWordsSelectedDisabled"
                                :data-test="EDataTest.words_container_header_checkbox"
                                :checked="isAllWordsSelected"
                                :on-update:checked="toggleAllWordsSelection">
                            </n-checkbox>
                        </n-flex>
                    </n-grid-item>
                    <n-grid-item span="19">
                        <n-input
                            data-test-blackout
                            :on-update:value="updateText"
                            :value="wordsFilters.text"
                            :data-test="EDataTest.words_container_header_search"
                            class="words-container-header__search-input"
                            type="text"
                            :placeholder="$t('search')"
                            clearable />
                        <WordsContainerAddWordButton v-if="isAddWordButtonNeeded" />
                    </n-grid-item>
                </n-grid>
            </n-grid-item>
            <n-grid-item span="2 m:1">
                <n-flex justify="end">
                    <WordsContainerHeaderStatuses
                        v-model:status="wordsFilters.status"
                        data-test-blackout/>
                </n-flex>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@import "words-container-header";
</style>
