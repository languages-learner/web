<script setup lang="ts">
const InterfaceLanguageSelector = defineAsyncComponent(() => import('@/components/InterfaceLanguageSelector/InterfaceLanguageSelector.vue'))

const { isUserDataLoaded, customData } = storeToRefs(useUserStore())
const { updateNativeLanguage } = useUserStore()
const { getTranslatedLanguageName, languages } = useConfigStore()
const { availableLearningLanguagesOptions, activeLearningLanguage, updateActiveLearningLanguage } = useLearningLanguage()

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
                    data-test-blackout
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
                <InterfaceLanguageSelector
                    v-if="isUserDataLoaded"
                    data-test-blackout
                    size="full"/>
                <n-skeleton
                    v-else
                    height="34px"
                    width="100%" />
            </n-form-item>
            <n-form-item
                :label="$t('learning_language')"
                path="selectValue">
                <n-select
                    v-if="isUserDataLoaded"
                    @update-value="updateActiveLearningLanguage"
                    data-test-blackout
                    :value="activeLearningLanguage.id"
                    :placeholder="$t('select')"
                    :options="availableLearningLanguagesOptions"
                    value-field="key"
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
