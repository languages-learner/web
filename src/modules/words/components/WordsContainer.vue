<script lang="ts" setup>
import WordsListFilter from '@/modules/words/components/WordsListFilter.vue'
import WordsList from '@/modules/words/components/WordsList.vue'
import WordCreator from '@/modules/words/components/WordCreator.vue'
import { useWords } from '@/modules/words/composables/useWords'
import { useWordsFilters } from '@/modules/words/composables/useWordsFilters'
import {
    computed,
    onMounted,
    ref,
    unref,
    watch
} from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const { filters, reset: resetFilters } = useWordsFilters()
const {
    words,
    isWordsLoaded,
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
}

const hasFilteredWord = computed(() => !Boolean(filters.text) || Boolean(unref(words).find(([word, _]) => word === filters.text)))

const isAddWordBlockNeededByUserRequest = ref(false)
const toggleIsAddWordBlockNeeded = () => {
    isAddWordBlockNeededByUserRequest.value = !unref(isAddWordBlockNeededByUserRequest)
}
watch(() => filters.text, () => isAddWordBlockNeededByUserRequest.value = false)

const wordCreatorType = computed(() => unref(words).length > 0 || unref(isAddWordBlockNeededByUserRequest) ? 'new_word' : 'not_found')
const isWordCreatorNeeded = computed(() => unref(isAddWordBlockNeededByUserRequest) || (!unref(words).length && filters.text))

onMounted(fetchWords)
watch(() => unref(customData)?.activeLearningLanguage, () => {
    resetFilters()
    resetAndFetchWords()
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
            :words="words"
            :selectedWords="selectedWords"
        />
    </div>
</template>
