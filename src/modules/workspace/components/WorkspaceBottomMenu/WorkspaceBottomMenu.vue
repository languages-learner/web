<script setup lang="ts">
import { EPageName } from '@@/src/enums/EPageName'
import {
    BarbellOutline,
    BookOutline,
    CogOutline,
    PersonOutline,
} from '@vicons/ionicons5'
import { type MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function renderIcon (icon: Component, color = 'white') {
    return () => h(NIcon, null, { default: () => h(icon, { 'color': color }) })
}
const menuOptions: MenuOption[] = [
    {
        label: () => h(RouterLink, { to: { name: EPageName.TRAININGS } }),
        key: EPageName.TRAININGS,
        icon: renderIcon(BarbellOutline),
    },
    {
        label: () => h(RouterLink, { to: { name: EPageName.DICTIONARY } }),
        key: EPageName.DICTIONARY,
        icon: renderIcon(BookOutline),
    },
    {
        key: 'profile',
        icon: renderIcon(PersonOutline),
        children: [
            {
                label: () => h(RouterLink, { to: { name: EPageName.OFFICE_PROFILE } }, () => t('profile')),
                key: EPageName.OFFICE_PROFILE,
                icon: renderIcon(PersonOutline, 'black'),
            },
            {
                label: () => h(RouterLink, { to: { name: EPageName.OFFICE_SETTINGS } }, () => t('settings')),
                key: EPageName.OFFICE_SETTINGS,
                icon: renderIcon(CogOutline, 'black'),
            },
        ],
    },
]
</script>

<template>
    <div class="workspace-bottom-menu">
        <n-menu
            :icon-size="30"
            mode="horizontal"
            :options="menuOptions"
            :value="$route.name"
        />
    </div>
</template>

<style scoped lang="scss">
@import "workspace-bottom-menu";
</style>
