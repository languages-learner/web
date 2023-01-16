<script lang="ts" setup>
import { NPopselect } from 'naive-ui'
import WordStatusIcon from '@/modules/words/components/WordStatus/WordStatusIcon.vue'
import { EWordStatus } from '@/modules/words/enums/EWordStatus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
    status: number
}>()

const emit = defineEmits<{
    (e: 'update', status: number): void
}>()

const statusOptions = [
    {
        label: t('new_word'),
        value: EWordStatus.NEW_WORD
    },
    {
        label: t('learn'),
        value: EWordStatus.LEARN
    },
    {
        label: t('learned'),
        value: EWordStatus.LEARNED
    },
]

const updateStatus = (status: number) => {
    emit('update', status)
}
</script>

<template>
    <n-popselect
        :value="props.status"
        :options="statusOptions"
        :on-update:value="updateStatus"
    >
        <WordStatusIcon :status="props.status" />
    </n-popselect>
</template>
