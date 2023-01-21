<script setup lang="ts">
import { computed, unref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import UserAvatar from '@/modules/workspace/components/UserAvatar/UserAvatar.vue'
import { useUserStore } from '@/store/modules/user'
import { useAuthenticationService } from '@/plugins/services'
import { useConfigStore } from '@/store/modules/config'
import { EPageName } from '@/enums/EPageName'

const router = useRouter()
const { isUserDataLoaded, customData, activeLearningLanguageName } = storeToRefs(useUserStore())
const { updateActiveLearningLanguage } = useUserStore()
const { signOut } = useAuthenticationService()
const { languagesAvailableForLearning, getTranslatedLanguageName } = useConfigStore()
const { t } = useI18n()

const navigationItems = computed(() => ([
    {
        label: t('trainings'),
        name: 'trainings',
    },
    {
        label: t('dictionary'),
        name: 'dictionary',
    },
]))

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
const handleSelectLearningLanguagesDropdownMenuItem = updateActiveLearningLanguage

const avatarDropdownMenuOptions = computed(() => ([
    {
        label: t('profile'),
        key: EPageName.OFFICE_PROFILE,
    },
    {
        key: 'header-divider',
        type: 'divider',
    },
    {
        label: t('settings'),
        key: EPageName.OFFICE_SETTINGS,
    },
    {
        label: t('sign_out'),
        key: 'sign_out',
    },
]))
const handleSelectAvatarDropdownMenuItem = (key: string) => {
    switch (key) {
    case EPageName.OFFICE_PROFILE:
    case EPageName.OFFICE_SETTINGS:
        router.push({ name: key })
        break
    case 'sign_out': signOut()
        break
    }
}
</script>

<template>
    <div class="workspace-header">
        <div class="workspace-header__menu">
            <n-gradient-text
                :size="24"
                type="success">
                LanguagesLearner
            </n-gradient-text>
            <div class="workspace-header__navigations">
                <div
                    v-for="navigationItem in navigationItems"
                    :key="`navigation-item-${navigationItem.name}`">
                    <n-button
                        quaternary
                        round>
                        <router-link :to="{name: navigationItem.name}">
                            {{ navigationItem.label }}
                        </router-link>
                    </n-button>
                </div>
            </div>
            <div class="workspace-header__controllers">
                <template v-if="isUserDataLoaded">
                    <n-dropdown
                        @select="handleSelectLearningLanguagesDropdownMenuItem"
                        trigger="hover"
                        :options="learningLanguagesOptions">
                        <n-button
                            icon-placement="right"
                            type="primary"
                            ghost>
                            {{ $t('learn') }} {{ activeLearningLanguageName }}
                        </n-button>
                    </n-dropdown>
                    <n-dropdown
                        @select="handleSelectAvatarDropdownMenuItem"
                        trigger="hover"
                        :options="avatarDropdownMenuOptions">
                        <UserAvatar size="medium" />
                    </n-dropdown>
                </template>
                <template v-else>
                    <n-skeleton
                        :width="120"
                        :sharp="false"
                        size="medium" />
                    <n-skeleton
                        :width="34"
                        :sharp="false"
                        size="medium" />
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "workspace-header";
</style>
