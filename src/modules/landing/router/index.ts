import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

const LandingLayout = () => import('@/modules/landing/layouts/LandingLayout.vue')
const LandingPage = () => import('@/modules/landing/pages/landing/LandingPage.vue')

export const landingRoutes: RouteRecordRaw[] = [{
    path: '',
    component: LandingLayout,
    children: [{
        name: EPageName.LANDING,
        path: '',
        component: LandingPage,
    }],
}]
