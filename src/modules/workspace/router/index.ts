import type { RouteRecordRaw } from 'vue-router'

import { officeRoutes } from '@/modules/workspace/modules/office/router'
import { trainingsRoutes } from '@/modules/workspace/modules/trainings/router'
import { wordsRoutes } from '@/modules/workspace/modules/words/router'

export const workspaceRoutes: RouteRecordRaw[] = [{
    path: '',
    component: () => import('@/modules/workspace/layouts/WorkspaceLayout.vue'),
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
