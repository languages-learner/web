<script setup lang="ts">
import { BuildOutline } from '@vicons/ionicons5'
</script>

<template>
    <n-row
        class="trainings-stub"
        justify-content="center"
        align-items="center">
        <n-result
            status="info"
            :title="$t('coming_soon')"
            size="huge"
        >
            <template #icon>
                <n-icon size="80">
                    <BuildOutline />
                </n-icon>
            </template>
        </n-result>
    </n-row>
</template>

<style scoped lang="scss">
@import "trainings";
</style>

