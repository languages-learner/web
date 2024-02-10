import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

export const trainingsRoutes: RouteRecordRaw[] = [{
    name: EPageName.TRAININGS,
    path: 'trainings',
    component: () => import('@/modules/workspace/modules/trainings/pages/Trainings/TrainingsPage.vue'),
}]
