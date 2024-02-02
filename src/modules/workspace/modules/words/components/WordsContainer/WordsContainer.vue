<script lang="ts" setup>
import {
    computed,
    onMounted,
    ref,
    unref,
    watch,
} from 'vue'
import { storeToRefs } from 'pinia'
import WordsContainerHeader from '@/modules/workspace/modules/words/components/WordsContainerHeader/WordsContainerHeader.vue'
import WordsList from '@/modules/workspace/modules/words/components/WordsList/WordsList.vue'
import WordCreator from '@/modules/workspace/modules/words/components/WordCreator/WordCreator.vue'
import { useWordsFilters } from '@/modules/workspace/modules/words/composables/useWordsFilters'
import { useUserStore } from '@/store/modules/user'
import { useWordsLoadingOnScroll } from '@/modules/workspace/modules/words/composables/useWordsLoadingOnScroll'
import { useWordsList } from '@/modules/workspace/modules/words/composables/useWordsList'

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

const hasFilteredWord = computed(() => !Boolean(wordsFilters.text) || Boolean(unref(words)[wordsFilters.text]))

const isAddWordBlockNeededByUserRequest = ref(false)
const toggleIsAddWordBlockNeeded = () => {
    isAddWordBlockNeededByUserRequest.value = !unref(isAddWordBlockNeededByUserRequest)
}
watch(() => wordsFilters.text, () => isAddWordBlockNeededByUserRequest.value = false)

const wordCreatorType = computed(() => unref(Object.keys(words)).length > 0 || unref(isAddWordBlockNeededByUserRequest) ? 'new_word' : 'not_found')
const isWordCreatorNeeded = computed(() => unref(isWordsLoaded) && !unref(isWordsLoading) &&
    (unref(isAddWordBlockNeededByUserRequest) || (!unref(words).length && wordsFilters.text)),
)

watch(() => unref(customData)?.activeLearningLanguage, () => {
    resetWordsFilters()
    resetAndFetchWords()
})

const bottom = ref<HTMLDivElement>()
onMounted(() => {
    useWordsLoadingOnScroll(bottom, isWordsLoading, isWordsLoaded, fetchWords)
    fetchWords()
})
</script>

<template>
    <div class="words-container">
        <WordsContainerHeader
            v-model:filters="wordsFilters"
            @addWord="toggleIsAddWordBlockNeeded"
            @toggleSelection="toggleAllWordsSelection"
            :isAddWordButtonNeeded="hasFilteredWord"
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
