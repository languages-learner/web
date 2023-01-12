<route lang="yaml">
meta:
    requiresAuth: true
    layout: officeLayout
</route>

<script setup lang="ts">
import OfficeNavigation from '@/modules/office/components/OfficeNavigation.vue'
import { NH2 } from 'naive-ui'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { EPageName } from '@/enums/EPageName'

const officeRouteTitle: Record<string, string> = {
    [EPageName.PROFILE]: 'Profile',
    [EPageName.SETTINGS]: 'Settings'
}

const route = useRoute()
const title = computed(() => officeRouteTitle[String(route.name)])
</script>

<template>
    <div class="office">
        <OfficeNavigation class="office_navigation" />
        <div class="office_body">
            <n-h2 class="office_body_title">{{ title }}</n-h2>
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "styles/office";
</style>
