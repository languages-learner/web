import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

const OfficeLayout = () => import('@/modules/workspace/modules/office/layouts/OfficeLayout.vue')
const OfficeProfile = () => import('@/modules/workspace/modules/office/pages/profile/OfficeProfilePage.vue')
const OfficeSettings = () => import('@/modules/workspace/modules/office/pages/settings/OfficeSettingsPage.vue')

export const officeRoutes: RouteRecordRaw[] = [{
    path: 'office',
    component: OfficeLayout,
    children: [{
        name: EPageName.OFFICE_PROFILE,
        path: 'profile',
        component: OfficeProfile,
    }, {
        name: EPageName.OFFICE_SETTINGS,
        path: 'settings',
        component: OfficeSettings,
    }],
}]
