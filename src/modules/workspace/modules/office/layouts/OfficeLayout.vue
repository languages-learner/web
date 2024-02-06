<script setup lang="ts">
import { EPageName } from '@/enums/EPageName'
import OfficeNavigation from '@/modules/workspace/modules/office/components/OfficeNavigation/OfficeNavigation.vue'
import { useAppBreakpoints } from '@/composables/useAppBreakpoints'

const { t } = useI18n()

const officeRouteTitle: ComputedRef<Record<string, string>> = computed(() => ({
    [EPageName.OFFICE_PROFILE]: t('profile'),
    [EPageName.OFFICE_SETTINGS]: t('settings'),
}))

const route = useRoute()
const title = computed(() => unref(officeRouteTitle)[String(route.name)])
const { isMobile } = useAppBreakpoints()
</script>

<template>
    <div class="office-layout">
        <OfficeNavigation v-if="!isMobile" />
        <div class="office-layout__container">
            <n-h2 class="office-layout__container-title">{{ title }}</n-h2>
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "office-layout";
</style>
