<script lang="ts" setup>
import {
    Pencil,
    TrashOutline,
    VolumeMediumOutline,
} from '@vicons/ionicons5'
import type { Word } from '@/services/dbstore/dto/Words'
import WordStatus from '@/modules/workspace/modules/words/components/WordStatus/WordStatus.vue'

const props = defineProps<{
    source: {
        word: string
        wordData: Word
        isSelected: boolean
    }
}>()

const { sendEmitToList } = useVirtualScrollListItemEmits()

const deleteWord = () => sendEmitToList('deleteWord', props.source.word)
const updateStatus = (status: Word['status']) => sendEmitToList('updateWordStatus',  props.source.word, status)
const updateTranslations = (translations: string[]) => sendEmitToList('updateWordTranslations',  props.source.word, translations)
const toggleSelection = () => sendEmitToList('toggleWordSelection',  props.source.word)

const isChangeableView = ref(false)
const toggleChangeableView = () => isChangeableView.value = !isChangeableView.value
</script>

<template>
    <div
        class="words-list-item"
        :data-test="EDataTest.words_list_item">
        <n-grid
            class="words-list-item__container"
            align-items="center"
            cols="27 s:26 m:24"
            responsive="screen"
        >
            <n-grid-item
                span="2 m:1"
                class="words-list-item__property">
                <n-checkbox
                    :data-test="EDataTest.words_list_item_checkbox"
                    :checked="source.isSelected"
                    :on-update:checked="toggleSelection">
                </n-checkbox>
            </n-grid-item>
            <n-grid-item
                span="3 s:2 m:1"
                class="words-list-item__property">
                <n-button text>
                    <template #icon>
                        <n-icon
                            size="20"
                            :depth="3">
                            <VolumeMediumOutline />
                        </n-icon>
                    </template>
                </n-button>
            </n-grid-item>
            <n-grid-item span="16 s:16 m:19">
                <n-space
                    vertical
                    class="words-list-item__property--translations">
                    <n-text
                        type="success"
                        :data-test="EDataTest.words_list_item_source_word"
                        :data-test-value="source.word"
                    >
                        {{ source.word }}
                    </n-text>
                    <n-dynamic-tags
                        v-if="isChangeableView"
                        :value="source.wordData.translations"
                        :on-update:value="updateTranslations"
                        :data-test="EDataTest.words_list_item_edit_translations"
                    />
                    <div
                        v-else
                        :data-test="EDataTest.words_list_item_translations">{{ source.wordData.translations.join(', ') }}</div>
                </n-space>
            </n-grid-item>
            <n-grid-item
                span="2 m:1"
                class="words-list-item__property">
                <n-button
                    text
                    :data-test="EDataTest.words_list_item_edit_button">
                    <n-icon
                        @click="toggleChangeableView"
                        size="20"
                        :depth="3">
                        <Pencil />
                    </n-icon>
                </n-button>
            </n-grid-item>
            <n-grid-item
                span="2 m:1"
                class="words-list-item__property">
                <WordStatus
                    @update="updateStatus"
                    :data-test="EDataTest.words_list_item_status"
                    :status="source.wordData.status"
                />
            </n-grid-item>
            <n-grid-item
                span="2 m:1"
                class="words-list-item__property">
                <n-button
                    text
                    :data-test="EDataTest.words_list_item_delete_button">
                    <n-icon
                        @click="deleteWord"
                        size="20"
                        :depth="3">
                        <TrashOutline />
                    </n-icon>
                </n-button>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@import "words-list-item";
</style>
