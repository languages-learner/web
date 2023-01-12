<script setup lang="ts">
import { NForm, NFormItem, NSelect, NSkeleton } from 'naive-ui'
import { computed, unref } from 'vue'
import { useConfigStore } from '@/store/modules/config'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'

const { interfaceLanguages } = useConfigStore()
const { customData, isUserDataLoaded } = storeToRefs(useUserStore())
const { updateInterfaceLanguage } = useUserStore()

const interfaceLanguage = computed({
    get() {
        return unref(customData)!.interfaceLanguage
    },
    set(value) {
        updateInterfaceLanguage(value)
    }
})
const interfaceLanguagesOptions = computed(() => interfaceLanguages.map(lng => ({ label: lng.name, value: lng.id })))
</script>

<template>
    <div class="office-settings">
        <n-form
            ref="formRef"
            label-placement="left"
            require-mark-placement="right-hanging"
            size="medium"
            label-width="auto"
            :style="{
                maxWidth: '640px'
            }"
        >
            <n-form-item label="Interface language" path="selectValue">
                <n-select
                    v-if="isUserDataLoaded"
                    v-model:value="interfaceLanguage"
                    placeholder="Select"
                    :options="interfaceLanguagesOptions"
                />
                <n-skeleton v-else height="34px" width="100%" />
            </n-form-item>
        </n-form>
    </div>
</template>

<style lang="scss" scoped>
@import "@/pages/styles/office-settings";
</style>
