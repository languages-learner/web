<script lang="ts" setup>
import { ref } from 'vue'
import {
    Pencil,
    TrashOutline,
    VolumeMediumOutline,
} from '@vicons/ionicons5'
import type { Word } from '@/services/dbstore/dto/Words'
import WordStatus from '@/modules/workspace/modules/words/components/WordStatus/WordStatus.vue'

const props = defineProps<{
    word: string
    wordData: Word
    isSelected: boolean
}>()

const emit = defineEmits<{
    (e: 'delete'): void
    (e: 'updateStatus', status: Word['status']): void
    (e: 'updateTranslations', translations: string[]): void
    (e: 'toggleSelection'): void
}>()

const deleteWord = () => {
    emit('delete')
}

const updateStatus = (status: Word['status']) => {
    emit('updateStatus', status)
}

const updateTranslations = (translations: string[]) => {
    emit('updateTranslations', translations)
}

const toggleSelection = () => emit('toggleSelection')

const isChangeableView = ref(false)
const toggleChangeableView = () => isChangeableView.value = !isChangeableView.value
</script>

<template>
    <n-list-item class="words-list-item">
        <n-row
            class="words-list-item__container"
            align-items="center">
            <n-col span="1">
                <div class="words-list-item__property">
                    <n-checkbox
                        :checked="isSelected"
                        :on-update:checked="toggleSelection">
                    </n-checkbox>
                </div>
            </n-col>
            <n-col
                span="1"
                class="words-list-item__property">
                <n-button text>
                    <template #icon>
                        <n-icon
                            @click="deleteWord"
                            size="20"
                            :depth="3">
                            <VolumeMediumOutline />
                        </n-icon>
                    </template>
                </n-button>
            </n-col>
            <n-col span="19">
                <n-space
                    vertical
                    class="words-list-item__property--translations">
                    <n-text type="success">{{ props.word }}</n-text>
                    <n-dynamic-tags
                        v-if="isChangeableView"
                        :value="props.wordData.translations"
                        :on-update:value="updateTranslations"
                    />
                    <div v-else>{{ props.wordData.translations.join(', ') }}</div>
                </n-space>
            </n-col>
            <n-col
                span="1"
                class="words-list-item__property">
                <n-button text>
                    <n-icon
                        @click="toggleChangeableView"
                        size="20"
                        :depth="3">
                        <Pencil />
                    </n-icon>
                </n-button>
            </n-col>
            <n-col
                span="1"
                class="words-list-item__property">
                <WordStatus
                    @update="updateStatus"
                    :status="props.wordData.status"/>
            </n-col>
            <n-col
                span="1"
                class="words-list-item__property">
                <n-button text>
                    <n-icon
                        @click="deleteWord"
                        size="20"
                        :depth="3">
                        <TrashOutline />
                    </n-icon>
                </n-button>
            </n-col>
        </n-row>
    </n-list-item>
</template>

<style lang="scss" scoped>
@import "words-list-item";
</style>
