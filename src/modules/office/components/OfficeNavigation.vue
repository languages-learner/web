<script lang="ts" setup>
import { computed, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { EPageName } from '@/enums/EPageName'
import { useI18n } from 'vue-i18n'

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
                        name: EPageName.PROFILE,
                    }
                },
                { default: () => t('profile') }
            ),
        key: EPageName.PROFILE,
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: EPageName.SETTINGS,
                    }
                },
                { default: () => t('settings') }
            ),
        key: EPageName.SETTINGS,
    },
]
</script>

<template>
    <n-menu
        ref="menuInstRef"
        :value="currentRoute"
        :options="menuOptions">
    </n-menu>
</template>
