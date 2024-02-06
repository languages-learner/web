<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { useLearningLanguage } from '@/composables/useLearningLanguage'

const { isUserDataLoaded } = storeToRefs(useUserStore())
const { availableLearningLanguagesOptionsExceptActive, activeLearningLanguageName, updateActiveLearningLanguage } = useLearningLanguage()
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
            {{ $t('learn') }} {{ activeLearningLanguageName }}
        </n-button>
    </n-dropdown>
    <n-skeleton
        v-else
        :width="120"
        :sharp="false"
        size="medium" />
</template>
