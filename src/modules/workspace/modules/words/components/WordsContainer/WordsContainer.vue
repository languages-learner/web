<script lang="ts" setup>
import {
    computed,
    onMounted,
    ref,
    unref,
    watch,
} from 'vue'
import { storeToRefs } from 'pinia'
import WordsListFilter from '@/modules/workspace/modules/words/components/WordsList/components/WordsListFilter/WordsListFilter.vue'
import WordsList from '@/modules/workspace/modules/words/components/WordsList/WordsList.vue'
import WordCreator from '@/modules/workspace/modules/words/components/WordCreator/WordCreator.vue'
import { useWords } from '@/modules/workspace/modules/words/composables/useWords'
import { useWordsFilters } from '@/modules/workspace/modules/words/composables/useWordsFilters'
import { useUserStore } from '@/store/modules/user'
import { useWordsLoadingOnScroll } from '@/modules/workspace/modules/words/composables/useWordsLoadingOnScroll'

const { filters, reset: resetFilters } = useWordsFilters()
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
} = useWords(filters)
const { customData } = storeToRefs(useUserStore())

const addWord = async (newTranslations: string[]) => {
    await baseAddWord(filters.text, newTranslations)
    isAddWordBlockNeededByUserRequest.value = false
}

const hasFilteredWord = computed(() => !Boolean(filters.text) || Boolean(unref(words).find(([word]) => word === filters.text)))

const isAddWordBlockNeededByUserRequest = ref(false)
const toggleIsAddWordBlockNeeded = () => {
    isAddWordBlockNeededByUserRequest.value = !unref(isAddWordBlockNeededByUserRequest)
}
watch(() => filters.text, () => isAddWordBlockNeededByUserRequest.value = false)

const wordCreatorType = computed(() => unref(words).length > 0 || unref(isAddWordBlockNeededByUserRequest) ? 'new_word' : 'not_found')
const isWordCreatorNeeded = computed(() => unref(isWordsLoaded) && !unref(isWordsLoading) &&
    (unref(isAddWordBlockNeededByUserRequest) || (!unref(words).length && filters.text)),
)

watch(() => unref(customData)?.activeLearningLanguage, () => {
    resetFilters()
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
        <WordsListFilter
            v-model:text="filters.text"
            v-model:status="filters.status"
            @addWord="toggleIsAddWordBlockNeeded"
            @toggleSelection="toggleAllWordsSelection"
            :hasFilteredWord="hasFilteredWord"
            :isAllWordsSelected="isAllWordsSelected"
        />
        <WordCreator
            v-if="isWordCreatorNeeded"
            @add="addWord"
            :type="wordCreatorType"
            :sourceWord="filters.text"/>
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
