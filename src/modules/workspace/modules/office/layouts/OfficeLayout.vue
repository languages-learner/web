<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ComputedRef } from 'vue'
import { EPageName } from '@/enums/EPageName'
import OfficeNavigation from '@/modules/workspace/modules/office/components/OfficeNavigation/OfficeNavigation.vue'

const { t } = useI18n()

const officeRouteTitle: ComputedRef<Record<string, string>> = computed(() => ({
    [EPageName.OFFICE_PROFILE]: t('profile'),
    [EPageName.OFFICE_SETTINGS]: t('settings'),
}))

const route = useRoute()
const title = computed(() => unref(officeRouteTitle)[String(route.name)])
</script>

<template>
    <div class="office-layout">
        <OfficeNavigation />
        <div class="office-layout__container">
            <n-h2 class="office-layout__container-title">{{ title }}</n-h2>
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "office-layout";
</style>
