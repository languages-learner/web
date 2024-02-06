<script lang="ts" setup>
import WordStatusIcon from '@/modules/workspace/modules/words/components/WordStatus/WordStatusIcon.vue'
import { EWordStatus } from '@/services/dbstore/dto/Words'

const { t } = useI18n()

const props = defineProps<{
    status: EWordStatus
}>()

const emit = defineEmits<{
    (e: 'update', status: EWordStatus): void
}>()

const statusOptions = [
    {
        label: t('new_word'),
        value: EWordStatus.NEW_WORD,
    },
    {
        label: t('learn'),
        value: EWordStatus.LEARN,
    },
    {
        label: t('learned'),
        value: EWordStatus.LEARNED,
    },
]

const updateStatus = (status: EWordStatus) => {
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
