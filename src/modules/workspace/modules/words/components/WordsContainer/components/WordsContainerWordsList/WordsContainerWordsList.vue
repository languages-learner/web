<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import VirtualList from 'vue3-virtual-scroll-list'
const WordsContainerWordsListItem = defineAsyncComponent(() => import('@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerWordsList/components/WordsContainerWordsListItem/WordsContainerWordsListItem.vue'))
const WordsContainerWordsListAddBlock = defineAsyncComponent(() => import('@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerWordsList/components/WordsContainerWordsListAddBlock/WordsContainerWordsListAddBlock.vue'))
const WordsContainerAddWordButton = defineAsyncComponent(() => import('@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerAddWordButton/WordsContainerAddWordButton.vue'))
import { EWordsContainerState, useWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'
import { type WordsContainerWordsListItemProps } from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerWordsList/components/WordsContainerWordsListItem/types'

const { isMobile } = useAppBreakpoints()
const {
    isWordsContainerState,

    words,
    wordsWithoutStatusFilter,
    wordsFilters,
    toggleWordSelection,

    deleteWord,
    updateWordTranslations,
    updateWordStatus,

    bottom,
} = useWordsContainerStore()

const items = computed(() => Array.from(words).map(([word, wordData]) => ({
    word,
    wordData,
} satisfies WordsContainerWordsListItemProps['source'])))
const itemsWithoutStatusFilter = computed(() => Array.from(wordsWithoutStatusFilter).map(([word, wordData]) => ({
    word,
    wordData,
    disabled: true,
} satisfies WordsContainerWordsListItemProps['source'])))

const isOtherWordsNeeded = computed(() => isWordsContainerState(EWordsContainerState.FOUND_WORDS_WITH_OTHER_STATUSES))
const isEmptyBlockNeeded = computed(() =>
    !unref(isOtherWordsNeeded) &&
    isWordsContainerState(EWordsContainerState.LOADED_WITHOUT_WORDS)
    && !isWordsContainerState(EWordsContainerState.ADDING_WORD),
)
const isLoaderNeeded = computed(() => isWordsContainerState([EWordsContainerState.LOADING_WORDS, EWordsContainerState.LOADING_ADDITIONAL_WORDS]))
const isAddBlockNeeded = computed(() =>
    unref(isMobile)
    && isWordsContainerState(EWordsContainerState.NOT_FOUND_WORD)
    && !isWordsContainerState(EWordsContainerState.FOUND_WORD_WITH_OTHER_STATUS)
    && (
        !isWordsContainerState(EWordsContainerState.LOADED_WITHOUT_WORDS)
        || isWordsContainerState(EWordsContainerState.FOUND_WORDS_WITH_OTHER_STATUSES)
    )
    && !isWordsContainerState(EWordsContainerState.ADDING_WORD),
)
const isWordsNeeded = computed(() => isWordsContainerState([
    EWordsContainerState.LOADED_WITH_WORDS,
    EWordsContainerState.ADDING_WORD,
]))
</script>

<template>
    <div class="words-container-words-list">
        <n-text
            v-if="isWordsContainerState(EWordsContainerState.ADDING_WORD) && words.size"
            type="success"
            underline
            strong
        >{{ $t('similar_words:') }}</n-text>
        <WordsContainerWordsListAddBlock
            v-if="isAddBlockNeeded"
            class="words-container-words-list__item" />
        <Suspense>
            <virtual-list
                v-if="isWordsNeeded"
                @deleteWord="deleteWord"
                @updateWordStatus="updateWordStatus"
                @updateWordTranslations="updateWordTranslations"
                @toggleWordSelection="toggleWordSelection"
                data-key="word"
                :data-sources="items"
                :data-component="WordsContainerWordsListItem"
                :data-test="EDataTest.words_list"
                :estimate-size="77"
                item-class="words-container-words-list__item"
                :page-mode="true"
            />
        </Suspense>
        <template v-if="isOtherWordsNeeded">
            <div class="words-container-words-list__other-words">
                <n-text
                    type="warning"
                    underline
                    strong
                >{{ $t('words_with_other_statuses:') }}</n-text>
                <WordsContainerWordsListItem
                    v-for="(source, index) in itemsWithoutStatusFilter"
                    :key="`word-${index}`"
                    class="words-container-words-list__item words-container-words-list__item--other"
                    :source="source"
                />
            </div>
        </template>
        <n-empty
            v-if="isEmptyBlockNeeded"
            class="words-container-words-list__empty"
            :description="$t('no_words_found')">
            <template #extra>
                <n-text
                    v-if="!wordsFilters.text"
                    type="success">
                    {{ $t('you_can_add_your_first_word_by_searching') }}
                </n-text>
                <WordsContainerAddWordButton
                    v-else
                    text-key="add_word"/>
            </template>
        </n-empty>
        <div
            v-if="isLoaderNeeded"
            class="words-container-words-list__loader"
            :data-test="EDataTest.words_list_loader">
            <n-spin size="large" />
        </div>
        <div ref="bottom"></div>
    </div>
</template>

<style lang="scss">
@import "words-container-words-list";
</style>
