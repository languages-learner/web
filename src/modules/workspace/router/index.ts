import type { RouteRecordRaw } from 'vue-router'

import { officeRoutes } from '@/modules/workspace/modules/office/router'
import { trainingsRoutes } from '@/modules/workspace/modules/trainings/router'
import { wordsRoutes } from '@/modules/workspace/modules/words/router'

const WorkspaceLayout = () => import('@/modules/workspace/layouts/WorkspaceLayout.vue')

export const workspaceRoutes: RouteRecordRaw[] = [{
    path: '',
    component: WorkspaceLayout,
    children: [{
        path: '',
        children: [
            ...officeRoutes,
            ...trainingsRoutes,
            ...wordsRoutes,
        ],
    }],
    meta: {
        requiresAuth: true,
    },
}]
