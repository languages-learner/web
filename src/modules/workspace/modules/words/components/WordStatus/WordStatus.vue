<script lang="ts" setup>
import WordStatusIcon from '@/modules/workspace/modules/words/components/WordStatus/WordStatusIcon.vue'
import { type EWordStatus } from '@/services/dbstore/dto/Words'
import { useWordStatuses } from '@/modules/workspace/modules/words/composables/useWordStatuses'

const { wordStatusOptions } = useWordStatuses()

const props = defineProps<{
    status: EWordStatus
}>()

const emit = defineEmits<{
    (e: 'update', status: EWordStatus): void
}>()

const updateStatus = (status: EWordStatus) => {
    emit('update', status)
}
</script>

<template>
    <div :data-test-value="props.status" >
        <n-popselect
            :value="props.status"
            :options="wordStatusOptions"
            :on-update:value="updateStatus"
        >
            <WordStatusIcon :status="props.status" />
        </n-popselect>
    </div>
</template>
