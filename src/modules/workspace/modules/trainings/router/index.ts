import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

const Trainings = () => import('@/modules/workspace/modules/trainings/pages/Trainings/TrainingsPage.vue')

export const trainingsRoutes: RouteRecordRaw[] = [{
    name: EPageName.TRAININGS,
    path: 'trainings',
    component: Trainings,
}]
