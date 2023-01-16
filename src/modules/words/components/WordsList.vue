<script lang="ts" setup>
import {
    NList,
    NListItem,
    NRow,
    NSpin
} from 'naive-ui'
import WordsListFilter from '@/modules/words/components/WordsListFilter.vue'
import WordsListItem from '@/modules/words/components/WordsListItem.vue'
import AddWordListItem from '@/modules/words/components/AddWordListItem.vue'
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

const { filters, updateText, updateStatus } = useWordsFilters()
const {
    words,
    isWordsLoaded,
    selectedWords,
    isAllWordsSelected,
    toggleWordSelection,
    toggleAllWordsSelection,
    addWord: baseAddWord,
    deleteWord,
    updateTranslations,
    updateWordStatus,
    fetchWords,
    resetAndFetchWords,
} = useWords(filters)
const { customData } = storeToRefs(useUserStore())

const addWord = async (newTranslations: string[]) => {
    await baseAddWord(filters.text, unref(newTranslations))
}

const thereIsFilerWord = computed(() => !Boolean(filters.text) || (unref(words).length > 0 && Boolean(unref(words).find(([word, _]) => word === filters.text))))

const isAddWordBlockNeededByUserRequest = ref(false)
const toggleIsAddWordBlockNeeded = () => {
    isAddWordBlockNeededByUserRequest.value = !unref(isAddWordBlockNeededByUserRequest)
}
watch(() => filters.text, () => isAddWordBlockNeededByUserRequest.value = false)
const addWordListItemType = computed(() => unref(words).length > 0 || unref(isAddWordBlockNeededByUserRequest) ? 'new_word' : 'not_found')
const isAddWordBlockNeeded = computed(() => unref(isAddWordBlockNeededByUserRequest) || (!unref(words).length && filters.text))

onMounted(fetchWords)
watch(() => unref(customData)?.activeLearningLanguage, resetAndFetchWords)
</script>

<template>
    <WordsListFilter
        @addWord="toggleIsAddWordBlockNeeded"
        @updateText="updateText"
        @updateStatus="updateStatus"
        @toggleSelection="toggleAllWordsSelection"
        :thereIsFilerWord="thereIsFilerWord"
        :isAllWordsSelected="isAllWordsSelected"
        :filters="filters"
    />
    <n-list>
        <template v-if="isWordsLoaded">
            <AddWordListItem
                v-if="isAddWordBlockNeeded"
                @add="addWord"
                :sourceWord="filters.text"
                :type="addWordListItemType"/>
            <WordsListItem
                v-for="([word, wordData], index) in words"
                :key="index"
                @delete="() => deleteWord(word)"
                @updateStatus="(status) => updateWordStatus(word, status)"
                @toggleSelection="() => toggleWordSelection(word)"
                @updateTranslations="(translations) => updateTranslations(word, translations)"
                class="words-list-item"
                :word="word"
                :wordData="wordData"
                :isSelected="selectedWords[word] ?? false"
            />
        </template>
        <n-list-item v-else>
            <n-row justify-content="center">
                <n-spin size="large" />
            </n-row>
        </n-list-item>
    </n-list>
</template>
