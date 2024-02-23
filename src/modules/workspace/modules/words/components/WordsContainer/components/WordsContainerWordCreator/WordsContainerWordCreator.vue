<script lang="ts" setup>
import { EWordsContainerState, useWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'

const {
    isWordsContainerState,
    wordsFilters,
    addWord: baseAddWord,

    toggleIsAddWordBlockNeeded,
} = useWordsContainerStore()

const isWordCreatorNeeded = computed(() => isWordsContainerState(EWordsContainerState.ADDING_WORD))

const newTranslations = ref<string[]>([])
const resetNewTranslations = () => newTranslations.value = []

const addWord = async () => {
    if (await baseAddWord(unref(newTranslations)))
        resetNewTranslations()
}
const close = () => {
    resetNewTranslations()
    toggleIsAddWordBlockNeeded()
}
</script>

<template>
    <n-card
        v-if="isWordCreatorNeeded"
        @close="close"
        closable
        class="words-container-words-creator"
        :title="$t('add_new_word')"
        :data-test="EDataTest.words_creator">
        <n-row
            justify-content="center"
            class="words-container-words-creator__container">
            <div class="words-container-words-creator__container__property words-container-words-creator__container__source-word">
                <span>{{ $t('source_word:') }}</span>
                <n-input
                    size="small"
                    :value="wordsFilters.text"
                    disabled></n-input>
            </div>
            <div class="words-container-words-creator__container__property">
                <span>{{ $t('translations:') }}</span>
                <n-dynamic-tags
                    v-model:value="newTranslations"
                    :data-test="EDataTest.words_creator_translations" />
            </div>
            <n-button
                v-if="newTranslations.length"
                @click="addWord"
                strong
                secondary
                type="success"
                class="words-container-words-creator__button"
                :data-test="EDataTest.words_creator_add_button"
            >
                {{ $t('add') }}
            </n-button>
        </n-row>
    </n-card>
</template>

<style lang="scss" scoped>
@import "words-container-words-creator";
</style>
