<script setup lang="ts">
const { isUserDataLoaded } = storeToRefs(useUserStore())
const { availableLearningLanguagesOptionsExceptActive, activeLearningLanguage, updateActiveLearningLanguage } = useLearningLanguage()
const { t } = useI18n()

const learningLanguagesOptions = computed(() => ([
    {
        type: 'group',
        label: t('available_languages'),
        key: 'main',
        children: unref(availableLearningLanguagesOptionsExceptActive),
    },
]))
</script>

<template>
    <n-dropdown
        v-if="isUserDataLoaded"
        @select="updateActiveLearningLanguage"
        trigger="hover"
        :options="learningLanguagesOptions">
        <n-button
            icon-placement="right"
            type="primary"
            ghost>
            {{ $t('learn') }} {{ activeLearningLanguage.name }}
        </n-button>
    </n-dropdown>
    <n-skeleton
        v-else
        :width="120"
        :sharp="false"
        size="medium" />
</template>
