import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

export const officeRoutes: RouteRecordRaw[] = [{
    path: 'office',
    component: () => import('@/modules/workspace/modules/office/layouts/OfficeLayout.vue'),
    children: [{
        name: EPageName.OFFICE_PROFILE,
        path: 'profile',
        component: () => import('@/modules/workspace/modules/office/pages/profile/OfficeProfilePage.vue'),
    }, {
        name: EPageName.OFFICE_SETTINGS,
        path: 'settings',
        component: () => import('@/modules/workspace/modules/office/pages/settings/OfficeSettingsPage.vue'),
    }],
}]
