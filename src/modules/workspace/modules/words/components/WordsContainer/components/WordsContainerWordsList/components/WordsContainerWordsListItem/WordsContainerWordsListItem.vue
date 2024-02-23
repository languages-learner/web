<script lang="ts" setup>
import {
    AlertCircle,
    Pencil,
    TrashOutline,
    VolumeMediumOutline,
} from '@vicons/ionicons5'
import { onClickOutside } from '@vueuse/core'
import { useDialog } from 'naive-ui'
import type { Word } from '@/services/dbstore/dto/Words'
import WordStatus from '@/modules/workspace/modules/words/components/WordStatus/WordStatus.vue'
import { type WordsContainerWordsListItemProps } from '@/modules/workspace/modules/words/components/WordsContainer/components/WordsContainerWordsList/components/WordsContainerWordsListItem/types'
import { useWordsContainerStore } from '@/modules/workspace/modules/words/components/WordsContainer/useWordsContainerStore'

const props = defineProps<WordsContainerWordsListItemProps>()

const { t } = useI18n()
const dialog = useDialog()
const {
    selectedWords,
    toggleWordSelection,

    deleteWord: baseDeleteWord,
    updateWordTranslations,
    updateWordStatus,
} = useWordsContainerStore()

const wordListItem = ref(null)

const isSelected = computed(() => selectedWords.has(props.source.word))
const deleteWord = () => baseDeleteWord(props.source.word)
const updateStatus = (status: Word['status']) => updateWordStatus(props.source.word, status)
const updateTranslations = (translations: string[]) => {
    if (!translations.length) {
        dialog.warning({
            title: t('warning'),
            content: t('delete_last_translation_warning_text'),
            positiveText: t('confirm'),
            negativeText: t('cancel'),
            onPositiveClick: () => {
                updateWordTranslations(props.source.word, translations)
            },
        })
    } else
        updateWordTranslations(props.source.word, translations)
}
const toggleSelection = () => toggleWordSelection(props.source.word)

const isChangeableView = ref(false)
let onClickOutsideStop: () => void
const toggleChangeableView = () => {
    if (!unref(isChangeableView)) {
        onClickOutsideStop = onClickOutside(wordListItem, () => {
            if (unref(isChangeableView)) {
                isChangeableView.value = false
                onClickOutsideStop()
            }
        })
    }

    isChangeableView.value = !isChangeableView.value
    if (!unref(isChangeableView) && onClickOutsideStop)
        onClickOutsideStop()
}
</script>

<template>
    <div
        ref="wordListItem"
        class="words-container-words-list-item"
        :class="{'words-container-words-list-item--disabled': source.disabled}"
        :data-test="EDataTest.words_list_item">
        <n-grid
            class="words-container-words-list-item__container"
            align-items="center"
            cols="27 s:26 m:24"
            responsive="screen"
        >
            <n-grid-item
                span="2 m:1"
                class="words-container-words-list-item__property">
                <n-checkbox
                    v-if="!source.disabled"
                    :data-test="EDataTest.words_list_item_checkbox"
                    :checked="isSelected"
                    :on-update:checked="toggleSelection">
                </n-checkbox>
            </n-grid-item>
            <n-grid-item
                span="3 s:2 m:1"
                class="words-container-words-list-item__property">
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
                    class="words-container-words-list-item__property--translations">
                    <n-text
                        :type="source.disabled ? 'warning' : 'success'"
                        :data-test="EDataTest.words_list_item_source_word"
                        :data-test-value="source.word"
                    >
                        {{ source.word }}
                    </n-text>
                    <n-dynamic-tags
                        v-if="isChangeableView"
                        :disabled="source.disabled"
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
                class="words-container-words-list-item__property">
                <n-button
                    :disabled="source.disabled"
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
                class="words-container-words-list-item__property">
                <WordStatus
                    @update="updateStatus"
                    :data-test="EDataTest.words_list_item_status"
                    :status="source.wordData.status"
                    :disabled="source.disabled"
                />
            </n-grid-item>
            <n-grid-item
                span="2 m:1"
                class="words-container-words-list-item__property">
                <n-popconfirm :disabled="source.disabled">
                    <template #icon>
                        <n-icon color="orange">
                            <AlertCircle />
                        </n-icon>
                    </template>
                    <template #action>
                        <n-button
                            @click="deleteWord"
                            type="warning"
                            size="small">
                            {{ $t('confirm') }}
                        </n-button>
                    </template>
                    <template #trigger>
                        <n-button
                            :disabled="source.disabled"
                            text
                            :data-test="EDataTest.words_list_item_delete_button">
                            <n-icon
                                size="20"
                                :depth="3">
                                <TrashOutline />
                            </n-icon>
                        </n-button>
                    </template>
                    {{ $t('want_to_delete?') }}
                </n-popconfirm>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style lang="scss" scoped>
@import "words-container-words-list-item";
</style>
