<script lang="ts" setup>
import { WordCreatorType } from '@/modules/workspace/modules/words/components/WordCreator/types'

const { t } = useI18n()

const props = defineProps<{
    sourceWord: string
    type: WordCreatorType
}>()

const emit = defineEmits<{
    (e: 'add', newTranslations: string[]): Promise<void>
}>()

const newTranslations = ref<string[]>([])
const resetNewTranslations = () => newTranslations.value = []

watch(() => props.sourceWord, resetNewTranslations)

const addWord = async () => {
    await emit('add', unref(newTranslations))
    resetNewTranslations()
}

const text = computed(() => {
    switch (props.type) {
    case WordCreatorType.NOT_FOUND: return t('no_suitable_words')
    case WordCreatorType.NEW_WORD: return t('add_new_word')
    }

    return ''
})
</script>

<template>
    <div class="words-creator">
        <n-row
            justify-content="center"
            class="words-creator__container">
            <span>{{ text }}</span>
            <n-dynamic-tags v-model:value="newTranslations" />
            <n-button
                v-if="newTranslations.length"
                @click="addWord"
                strong
                secondary
                type="success"
                class="words-creator__button"
            >
                {{ $t('add') }}
            </n-button>
        </n-row>
        <n-divider />
    </div>
</template>

<style lang="scss" scoped>
@import "words-creator";
</style>
