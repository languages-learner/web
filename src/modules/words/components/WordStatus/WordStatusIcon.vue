<script lang="ts" setup>
import { Checkmark, CheckmarkDone } from '@vicons/ionicons5'
import { EWordStatus } from '@/modules/words/enums/EWordStatus'

const props = defineProps<{
    status: EWordStatus
}>()
</script>

<template>
    <n-icon
        size="20"
        :depth="3">
        <Checkmark v-if="props.status === EWordStatus.NEW_WORD" />
        <Checkmark
            v-if="props.status === EWordStatus.LEARN"
            color="#f0a020" />
        <CheckmarkDone
            v-else-if="props.status === EWordStatus.LEARNED"
            color="#0e7a0d"/>
    </n-icon>
</template>
