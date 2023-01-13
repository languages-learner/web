<script setup lang="ts">
import {
    NAvatar,
    NButton,
    NDropdown,
    NGradientText,
    NSkeleton
} from 'naive-ui'
import { useUserStore } from '@/store/modules/user'
import { useAuthenticationService } from '@/plugins/services'
import { computed, unref } from 'vue'
import { useConfigStore } from '@/store/modules/config'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { EPageName } from '@/enums/EPageName'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { isUserDataLoaded, isLoggedIn, profileData, customData, activeLearningLanguageName } = storeToRefs(useUserStore())
const { updateActiveLearningLanguage } = useUserStore()
const { signOut } = useAuthenticationService()
const { languagesAvailableForLearning } = useConfigStore()
const { t } = useI18n()

const navigationItems = computed(() => ([
    {
        label: t('trainings'),
        name: 'trainings',
        isVisible: isLoggedIn,
    },
    {
        label: t('dictionary'),
        name: 'dictionary',
        isVisible: isLoggedIn,
    },
]))

const learningLanguagesOptions = computed(() => ([
    {
        type: 'group',
        label: t('available_languages'),
        key: 'main',
        children: languagesAvailableForLearning.filter(language => language.id !== unref(customData)?.activeLearningLanguage)
            .map(lng => ({
                key: lng.id,
                label: t(`language.${lng.name}`)
            }))
    }
]))
const handleSelectLearningLanguagesDropdownMenuItem = updateActiveLearningLanguage

const avatarDropdownMenuOptions = computed(() => ([
    {
        label: t('profile'),
        key: EPageName.PROFILE
    },
    {
        key: 'header-divider',
        type: 'divider'
    },
    {
        label: t('settings'),
        key: EPageName.SETTINGS,
    },
    {
        label: t('sign_out'),
        key: 'sign_out'
    },
]))
const handleSelectAvatarDropdownMenuItem = (key: string) => {
    switch (key) {
    case EPageName.PROFILE:
    case EPageName.SETTINGS:
        router.push({ name: key })
        break
    case 'sign_out': signOut()
        break
    }
}
</script>

<template>
    <div class="app-header">
        <div class="menu">
            <n-gradient-text
                :size="24"
                type="success">
                LanguageLearner
            </n-gradient-text>
            <div class="menu_navigations navigations">
                <template v-for="navigationItem in navigationItems">
                    <div
                        v-if="unref(navigationItem.isVisible)"
                        :key="`navigation-item-${navigationItem.name}`">
                        <n-button
                            quaternary
                            round>
                            <router-link :to="{name: navigationItem.name}">
                                {{ navigationItem.label }}
                            </router-link>
                        </n-button>
                    </div>
                </template>
            </div>
            <div
                v-if="isLoggedIn"
                class="menu_controllers controllers">
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
                        <n-avatar
                            size="medium"
                            :src="profileData?.photoURL"
                        />
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
            <div
                v-else
                class="menu_controllers controllers">
                <n-button
                    type="info"
                    ghost>
                    <router-link :to="{name: EPageName.SIGNIN}">
                        {{ $t('sign_in') }}
                    </router-link>
                </n-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "styles/app-header";
</style>
