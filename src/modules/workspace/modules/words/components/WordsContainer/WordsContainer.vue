<script lang="ts" setup>
import { useElementVisibility, useToggle } from '@vueuse/core'
import WordsContainerHeader from '@/modules/workspace/modules/words/components/WordsContainerHeader/WordsContainerHeader.vue'
import WordsList from '@/modules/workspace/modules/words/components/WordsList/WordsList.vue'
import WordCreator from '@/modules/workspace/modules/words/components/WordCreator/WordCreator.vue'
import { useWordsFilters } from '@/modules/workspace/modules/words/composables/useWordsFilters'
import { useUserStore } from '@/store/modules/user'
import { useWordsList } from '@/modules/workspace/modules/words/composables/useWordsList'
import { WordCreatorType } from '@/modules/workspace/modules/words/components/WordCreator/types'

const {
    wordsFilters,
    resetWordsFilters,
} = useWordsFilters()
const {
    words,
    isWordsLoaded,
    isWordsLoading,
    selectedWords,
    isAllWordsSelected,
    toggleWordSelection,
    toggleAllWordsSelection,
    addWord: baseAddWord,
    deleteWord,
    updateWordTranslations,
    updateWordStatus,
    fetchWords,
    resetAndFetchWords,
} = useWordsList(wordsFilters)
const { customData } = storeToRefs(useUserStore())

const addWord = async (newTranslations: string[]) => {
    await baseAddWord(wordsFilters.text, newTranslations)
    isAddWordBlockNeededByUserRequest.value = false
}

const bottom = ref()
const isBottomReached = useElementVisibility(bottom)

const hasFilteredWord = computed(() => !Boolean(wordsFilters.text) || Boolean(unref(words).has(wordsFilters.text)))

const [isAddWordBlockNeededByUserRequest, toggleIsAddWordBlockNeeded] = useToggle()

const wordCreatorType = computed(() => unref(words).size > 0 || unref(isAddWordBlockNeededByUserRequest)
    ? WordCreatorType.NEW_WORD
    : WordCreatorType.NOT_FOUND)
const isWordCreatorNeeded = computed(() => unref(isWordsLoaded) && !unref(isWordsLoading) &&
    (unref(isAddWordBlockNeededByUserRequest) || (!unref(words).size && wordsFilters.text)),
)

watch([isBottomReached, isWordsLoading], () => {
    if (unref(isBottomReached) && !unref(isWordsLoading)) {
        fetchWords()
    }
})
watch(() => wordsFilters.text, () => isAddWordBlockNeededByUserRequest.value = false)
watch(() => unref(customData)?.activeLearningLanguage, () => {
    resetWordsFilters()
    resetAndFetchWords()
})
</script>

<template>
    <div class="words-container">
        <WordsContainerHeader
            v-model:filters="wordsFilters"
            @addWord="toggleIsAddWordBlockNeeded"
            @toggleSelection="toggleAllWordsSelection"
            :isAddWordButtonNeeded="!hasFilteredWord"
            :isAllWordsSelected="isAllWordsSelected"
        />
        <WordCreator
            v-if="isWordCreatorNeeded"
            @add="addWord"
            :type="wordCreatorType"
            :sourceWord="wordsFilters.text"/>
        <WordsList
            @deleteWord="deleteWord"
            @updateWordStatus="updateWordStatus"
            @toggleWordSelection="toggleWordSelection"
            @updateWordTranslations="updateWordTranslations"
            :isWordsLoaded="isWordsLoaded"
            :isWordsLoading="isWordsLoading"
            :words="words"
            :selectedWords="selectedWords"
        />
        <div ref="bottom"></div>
    </div>
</template>
