<script setup lang="ts">
import { EPageName } from '@/enums/EPageName'
import WorkspaceHeaderUserAvatar from '@/modules/workspace/components/WorkspaceHeader/components/WorkspaceHeaderUserAvatar/WorkspaceHeaderUserAvatar.vue'
import WorkspaceHeaderActiveLearningLanguage from '@/modules/workspace/components/WorkspaceHeader/components/WorkspaceHeaderActiveLearningLanguage/WorkspaceHeaderActiveLearningLanguage.vue'
import { useI18n } from '@/plugins/i18n'
import { EDataTest } from '@/enums/EDataTest'

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
            cols="2 s:19"
            responsive="screen"
        >
            <n-grid-item span="1 s:4">
                <router-link :to="{name: EPageName.DICTIONARY}">
                    <n-gradient-text
                        size="24"
                        type="success">
                        LanguagesLearner
                    </n-gradient-text>
                </router-link>
            </n-grid-item>
            <!--            TODO Fix menu view for "m" size-->
            <n-grid-item
                class="workspace-header__navigations"
                span="0 s:10"
            >
                <div
                    v-for="navigationItem in navigationItems"
                    :key="`navigation-item-${navigationItem.name}`"
                    :data-test="EDataTest.workspace_navigation_item"
                >
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
                span="0 s:5"
                class="workspace-header__controllers">
                <WorkspaceHeaderActiveLearningLanguage />
                <WorkspaceHeaderUserAvatar />
            </n-grid-item>
            <n-grid-item span="1 s:0">
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
