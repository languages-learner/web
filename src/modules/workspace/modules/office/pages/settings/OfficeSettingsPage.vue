<script setup lang="ts">
import type { WritableComputedRef } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useInterfaceLanguageStore } from '@/store/modules/interfaceLanguage'
import { useConfigStore } from '@/store/modules/config'
import { BASE_INTERFACE_LANGUAGE } from '@/const/BaseInterfaceLanguage'

const { interfaceLanguages, interfaceLanguageId } = storeToRefs(useInterfaceLanguageStore())
const { setInterfaceLanguage } = useInterfaceLanguageStore()
const { isUserDataLoaded, customData } = storeToRefs(useUserStore())
const { updateInterfaceLanguage, updateNativeLanguage } = useUserStore()
const { getTranslatedLanguageName, languages } = useConfigStore()

const interfaceLanguage: WritableComputedRef<number> = computed({
    get() {
        return unref(interfaceLanguageId)
    },
    set(value: number) {
        updateInterfaceLanguage(value)
        setInterfaceLanguage(value)
    },
})
const interfaceLanguagesOptions = computed(() => unref(interfaceLanguages).map(languageId => ({ label: getTranslatedLanguageName(languageId), value: languageId })))

const nativeLanguage = computed({
    get() {
        return unref(customData)?.nativeLanguage ?? BASE_INTERFACE_LANGUAGE
    },
    set(value) {
        updateNativeLanguage(value)
    },
})
const nativeLanguagesOptions = computed(() => Object.keys(unref(languages)).map(languageId => ({ label: getTranslatedLanguageName(Number(languageId)), value: Number(languageId) })))
</script>

<template>
    <div class="office-settings">
        <n-form
            ref="formRef"
            label-placement="left"
            require-mark-placement="right-hanging"
            size="medium"
            label-width="auto"
        >
            <n-form-item
                :label="$t('native_language')"
                path="selectValue">
                <n-select
                    v-if="isUserDataLoaded"
                    v-model:value="nativeLanguage"
                    :placeholder="$t('select')"
                    :options="nativeLanguagesOptions"
                />
                <n-skeleton
                    v-else
                    height="34px"
                    width="100%" />
            </n-form-item>
            <n-form-item
                :label="$t('interface_language')"
                path="selectValue">
                <n-select
                    v-if="isUserDataLoaded"
                    v-model:value="interfaceLanguage"
                    :placeholder="$t('select')"
                    :options="interfaceLanguagesOptions"
                />
                <n-skeleton
                    v-else
                    height="34px"
                    width="100%" />
            </n-form-item>
        </n-form>
    </div>
</template>

<style lang="scss" scoped>
@import "office-settings";
</style>
