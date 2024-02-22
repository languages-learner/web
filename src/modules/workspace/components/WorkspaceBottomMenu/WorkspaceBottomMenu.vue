<script setup lang="ts">
import {
    BarbellOutline,
    BookOutline,
    CogOutline,
    PersonOutline,
} from '@vicons/ionicons5'
import { type MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { type RouteLocationNamedRaw, RouterLink } from 'vue-router'
import { type Component } from 'vue'

const { t } = useI18n()

const renderIcon = (icon: Component, color = 'white', options: object = {}) => () =>
    h(NIcon, null, { default: () => h(icon, {
        color: color,
        ...options,
    }),
    })

const renderRouterLink = (to: RouteLocationNamedRaw, options: {text?: string} = {}) => () =>
    h(RouterLink, {
        to: to,
        '^data-test': EDataTest.workspace_bottom_menu_item,
        '^data-test-value': to.name,
    }, () => options.text ?? '')

const menuOptions: MenuOption[] = [
    {
        label: renderRouterLink({ name: EPageName.TRAININGS }),
        key: EPageName.TRAININGS,
        icon: renderIcon(BarbellOutline),
    },
    {
        label: renderRouterLink({ name: EPageName.DICTIONARY }),
        key: EPageName.DICTIONARY,
        icon: renderIcon(BookOutline),
    },
    {
        key: 'profile',
        icon: renderIcon(PersonOutline, 'white', {
            '^data-test': EDataTest.workspace_bottom_menu_item,
            '^data-test-value': EPageName.OFFICE,
        }),
        children: [
            {
                label: renderRouterLink({ name: EPageName.OFFICE_PROFILE }, { text: t('profile') }),
                key: EPageName.OFFICE_PROFILE,
                icon: renderIcon(PersonOutline, 'black'),
            },
            {
                label: renderRouterLink({ name: EPageName.OFFICE_SETTINGS }, { text: t('settings') }),
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
            :data-test="EDataTest.workspace_bottom_menu"
            :icon-size="30"
            mode="horizontal"
            :options="menuOptions"
            :value="String($route.name)"
        />
    </div>
</template>

<style scoped lang="scss">
@import "workspace-bottom-menu";
</style>
