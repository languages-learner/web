<script setup lang="ts">
import { useWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'

withDefaults(defineProps<{
    textKey?: string
}>(), {
    textKey: 'add',
})

const {
    toggleIsAddWordBlockNeeded,
} = useWordsContainerStore()
</script>

<template>
    <n-button
        @click="() => toggleIsAddWordBlockNeeded()"
        :data-test="EDataTest.words_container_add_word_button"
        type="success"
        strong
        secondary>
        {{ $t(textKey) }}
    </n-button>
</template>
