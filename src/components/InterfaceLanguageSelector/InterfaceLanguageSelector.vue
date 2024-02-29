<script setup lang="ts">
import { type SelectOption, type SelectProps } from 'naive-ui'
import { type VNodeChild } from 'vue'

const props = withDefaults(defineProps<{
    size: 'full' | 'short'
    theme?: 'base' | 'green'
}>(), {
    theme: 'base',
})

const { isLoggedIn } = storeToRefs(useUserStore())
const { updateInterfaceLanguage } = useUserStore()
const { interfaceLanguages, interfaceLanguageId } = storeToRefs(useInterfaceLanguageStore())
const { setInterfaceLanguage } = useInterfaceLanguageStore()
const { getTranslatedLanguageName, getLanguageName } = useConfigStore()

const interfaceLanguage = computed({
    get() {
        return unref(interfaceLanguageId)
    },
    set(value: number) {
        if (unref(isLoggedIn))
            updateInterfaceLanguage(value)
        setInterfaceLanguage(value)
    },
})
const interfaceLanguagesOptions = computed(() => unref(interfaceLanguages).map(languageId => ({
    label: getTranslatedLanguageName(languageId, props.size),
    value: languageId,
})))

const renderLabel = (option: SelectOption): VNodeChild => {
    return h('div', {
        '^data-test': EDataTest.interface_language_selector_item,
        '^data-test-value': getLanguageName(option.value as number),
    }, option.label as string)
}
const themeOverrides: NonNullable<SelectProps['themeOverrides']> = props.theme === 'green' ? {
    peers: {
        InternalSelection: {
            border: 'rgba(62,216,135,0.47)',
            color: 'rgba(62,216,135,0.47)',
            colorActive: 'rgba(62,216,135,0.47)',
        },
    },
} : {}
</script>

<template>
    <n-select
        v-model:value="interfaceLanguage"
        :consistent-menu-width="size !== 'short'"
        :data-test="EDataTest.interface_language_selector"
        :placeholder="$t('select')"
        :options="interfaceLanguagesOptions"
        :render-label="renderLabel"
        :theme-overrides="themeOverrides"
    />
</template>
