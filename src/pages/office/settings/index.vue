<script setup lang="ts">
import { NForm, NFormItem, NSelect, NSkeleton } from 'naive-ui'
import { computed, unref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import { useInterfaceLanguageStore } from '@/store/modules/interfaceLanguage'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { interfaceLanguages, interfaceLanguage: baseInterfaceLanguage } = storeToRefs(useInterfaceLanguageStore())
const { setInterfaceLanguage } = useInterfaceLanguageStore()
const { isUserDataLoaded } = storeToRefs(useUserStore())
const { updateInterfaceLanguage } = useUserStore()

const interfaceLanguage = computed({
    get() {
        return unref(baseInterfaceLanguage)
    },
    set(value) {
        updateInterfaceLanguage(value)
        setInterfaceLanguage(value)
    }
})
const interfaceLanguagesOptions = computed(() => unref(interfaceLanguages).map(lng => ({ label: t(`language.${lng}`), value: lng })))
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
            <n-form-item :label="$t('interface_language')" path="selectValue">
                <n-select
                    v-if="isUserDataLoaded"
                    v-model:value="interfaceLanguage"
                    :placeholder="$t('select')"
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
