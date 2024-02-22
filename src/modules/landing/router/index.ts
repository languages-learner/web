import type { RouteRecordRaw } from 'vue-router'

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
