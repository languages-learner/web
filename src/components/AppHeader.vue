<script setup lang="ts">
import { NAvatar, NDropdown, NButton, NSkeleton, NGradientText } from 'naive-ui'
import { useUserStore } from '@/store/modules/user'
import { useAuthenticationService } from '@/plugins/services'
import { computed, unref } from 'vue'
import { useConfigStore } from '@/store/modules/config'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

const router = useRouter()
const { isUserDataLoaded, isLoggedIn, profileData, customData, activeLearningLanguageName } = storeToRefs(useUserStore())
const { updateActiveLearningLanguage } = useUserStore()
const { signOut } = useAuthenticationService()
const { languagesAvailableForLearning } = useConfigStore()
const navigationItems = [
    {
        label: 'Trainings',
        name: 'trainings',
        isVisible: isLoggedIn,
    },
    {
        label: 'Dictionary',
        name: 'dictionary',
        isVisible: isLoggedIn,
    },
]

const learningLanguagesOptions = computed(() => ([
    {
        type: 'group',
        label: 'Available languages',
        key: 'main',
        children: languagesAvailableForLearning.filter(language => language.id !== unref(customData)?.activeLearningLanguage)
            .map(lng => ({
                key: lng.id,
                label: lng.name
            }))
    }
]))
const handleSelectLearningLanguagesDropdownMenuItem = updateActiveLearningLanguage

const avatarDropdownMenuOptions = [
    {
        label: 'Profile',
        key: EPageName.PROFILE
    },
    {
        key: 'header-divider',
        type: 'divider'
    },
    {
        label: 'Settings',
        key: EPageName.SETTINGS,
    },
    {
        label: 'Sign out',
        key: 'Sign out'
    },
]
const handleSelectAvatarDropdownMenuItem = (key: string) => {
    switch (key) {
    case EPageName.PROFILE:
    case EPageName.SETTINGS:
        router.push({ name: key })
        break
    case 'Sign out': signOut()
        break
    }
}
</script>

<template>
    <div class="app-header">
        <div class="menu">
            <n-gradient-text :size="24" type="success">
                LanguageLearner
            </n-gradient-text>
            <div class="menu_navigations navigations">
                <template v-for="navigationItem in navigationItems">
                    <div v-if="unref(navigationItem.isVisible)" :key="`navigation-item-${navigationItem.name}`">
                        <n-button quaternary round>
                            <router-link :to="{name: navigationItem.name}">
                                {{ navigationItem.label }}
                            </router-link>
                        </n-button>
                    </div>
                </template>
            </div>
            <div v-if="isLoggedIn" class="menu_controllers controllers">
                <template v-if="isUserDataLoaded">
                    <n-dropdown trigger="hover" :options="learningLanguagesOptions" @select="handleSelectLearningLanguagesDropdownMenuItem">
                        <n-button icon-placement="right" type="primary" ghost>
                            Learn {{ activeLearningLanguageName }}
                        </n-button>
                    </n-dropdown>
                    <n-dropdown trigger="hover" :options="avatarDropdownMenuOptions" @select="handleSelectAvatarDropdownMenuItem">
                        <n-avatar
                            size="medium"
                            :src="profileData?.photoURL"
                        />
                    </n-dropdown>
                </template>
                <template v-else>
                    <n-skeleton :width="120" :sharp="false" size="medium" />
                    <n-skeleton :width="34" :sharp="false" size="medium" />
                </template>
            </div>
            <div v-else class="menu_controllers controllers">
                <n-button type="info" ghost>
                    <router-link :to="{name: 'signin'}">
                        Signin
                    </router-link>
                </n-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "styles/app-header";
</style>
