<script lang="ts" setup>
import { computed, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { MenuOption } from 'naive-ui'
import { EPageName } from '@/enums/EPageName'

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
        :value="currentRoute"
        :options="menuOptions">
    </n-menu>
</template>
