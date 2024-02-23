<script lang="ts" setup>
import WordStatusIcon from '@/modules/workspace/modules/words/components/WordStatus/WordStatusIcon.vue'
import { type EWordStatus } from '@/services/dbstore/dto/Words'
import { useWordStatuses } from '@/modules/workspace/modules/words/composables/useWordStatuses'

const { wordStatusOptions } = useWordStatuses()
const options = computed(() => unref(wordStatusOptions).map(option => ({
    ...option,
    class: EDataTestClass.word_status,
})))

const props = defineProps<{
    status: EWordStatus
    disabled?: boolean
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
            :disabled="disabled"
            :value="props.status"
            :options="options"
            :on-update:value="updateStatus"
        >
            <WordStatusIcon :status="props.status" />
        </n-popselect>
    </div>
</template>
