<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

const { t } = useI18n()
const route = useRoute()
const currentRoute = computed(() => String(route.name))

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: EPageName.OFFICE_PROFILE,
                    },
                },
                { default: () => t('profile') },
            ),
        key: EPageName.OFFICE_PROFILE,
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: EPageName.OFFICE_SETTINGS,
                    },
                },
                { default: () => t('settings') },
            ),
        key: EPageName.OFFICE_SETTINGS,
    },
]
</script>

<template>
    <n-menu
        :data-test="EDataTest.office_menu"
        :data-test-value="currentRoute"
        :value="currentRoute"
        :options="menuOptions">
    </n-menu>
</template>
