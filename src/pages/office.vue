<route lang="yaml">
meta:
    requiresAuth: true
    layout: workspaceLayout
</route>

<script setup lang="ts">
import OfficeNavigation from '@/modules/office/components/OfficeNavigation.vue'
import { useRoute } from 'vue-router'
import {
    ComputedRef,
    computed,
    unref
} from 'vue'
import { EPageName } from '@/enums/EPageName'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const officeRouteTitle: ComputedRef<Record<string, string>> = computed(() => ({
    [EPageName.PROFILE]: t('profile'),
    [EPageName.SETTINGS]: t('settings')
}))

const route = useRoute()
const title = computed(() => unref(officeRouteTitle)[String(route.name)])
</script>

<template>
    <div class="office">
        <OfficeNavigation />
        <div class="office__container">
            <n-h2 class="office__container-title">{{ title }}</n-h2>
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "styles/office";
</style>
