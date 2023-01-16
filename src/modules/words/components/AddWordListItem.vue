<script lang="ts" setup>
import {
    NButton,
    NDynamicTags,
    NListItem,
    NRow,
} from 'naive-ui'
import {
    computed,
    ref,
    unref,
    watch
} from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
    sourceWord: string
    type: 'not_found' | 'new_word'
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
    case 'not_found': return t('no_suitable_words')
    case 'new_word': return t('add_new_word')
    }

    return ''
})
</script>

<template>
    <n-list-item class="add-word-list-item">
        <n-row
            justify-content="center"
            class="add-word-list-item_container">
            <span>{{ text }}</span>
            <n-dynamic-tags v-model:value="newTranslations" />
            <n-button
                v-if="newTranslations.length"
                @click="addWord"
                strong
                secondary
                type="success"
                class="add-word-list-item_button"
            >
                {{ $t('add') }}
            </n-button>
        </n-row>
    </n-list-item>
</template>

<style lang="scss" scoped>
@import "styles/add-word-list-item";
</style>
