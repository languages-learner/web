<script setup lang="ts">
import { EPageName } from '@/enums/EPageName'
import WorkspaceHeaderUserAvatar from '@/modules/workspace/components/WorkspaceHeader/components/WorkspaceHeaderUserAvatar/WorkspaceHeaderUserAvatar.vue'
import WorkspaceHeaderActiveLearningLanguage from '@/modules/workspace/components/WorkspaceHeader/components/WorkspaceHeaderActiveLearningLanguage/WorkspaceHeaderActiveLearningLanguage.vue'

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
</script>

<template>
    <div class="workspace-header">
        <n-grid
            class="workspace-header__menu"
            cols="2 m:19"
            responsive="screen"
        >
            <n-grid-item span="1 m:4">
                <router-link :to="{name: EPageName.DICTIONARY}">
                    <n-gradient-text
                        size="24"
                        type="success">
                        LanguagesLearner
                    </n-gradient-text>
                </router-link>
            </n-grid-item>
            <n-grid-item
                class="workspace-header__navigations"
                span="0 m:10"
            >
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
            </n-grid-item>
            <n-grid-item
                span="0 m:5"
                class="workspace-header__controllers">
                <WorkspaceHeaderActiveLearningLanguage />
                <WorkspaceHeaderUserAvatar />
            </n-grid-item>
            <n-grid-item span="1 m:0">
                <n-flex justify="end">
                    <WorkspaceHeaderUserAvatar />
                </n-flex>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<style scoped lang="scss">
@import "workspace-header";
</style>
