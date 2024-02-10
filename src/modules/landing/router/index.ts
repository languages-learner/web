import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

export const landingRoutes: RouteRecordRaw[] = [{
    path: '',
    component: () => import('@/modules/landing/layouts/LandingLayout.vue'),
    children: [
        {
            name: EPageName.LANDING,
            path: '',
            component: () => import('@/modules/landing/pages/landing/LandingPage.vue'),
        },
    ],
}]
