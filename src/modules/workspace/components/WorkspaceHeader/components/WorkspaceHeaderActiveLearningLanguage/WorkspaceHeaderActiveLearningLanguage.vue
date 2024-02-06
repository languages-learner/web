<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/modules/user'
import { useConfigStore } from '@/store/modules/config'

const { isUserDataLoaded, customData, activeLearningLanguageName } = storeToRefs(useUserStore())
const { updateActiveLearningLanguage } = useUserStore()
const { languagesAvailableForLearning, getTranslatedLanguageName } = useConfigStore()
const { t } = useI18n()

const learningLanguagesOptions = computed(() => ([
    {
        type: 'group',
        label: t('available_languages'),
        key: 'main',
        children: languagesAvailableForLearning.filter(languageId => languageId !== unref(customData)?.activeLearningLanguage)
            .map(languageId => ({
                key: languageId,
                label: getTranslatedLanguageName(languageId),
            })),
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
            {{ $t('learn') }} {{ activeLearningLanguageName }}
        </n-button>
    </n-dropdown>
    <n-skeleton
        v-else
        :width="120"
        :sharp="false"
        size="medium" />
</template>
