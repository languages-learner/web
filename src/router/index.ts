import {
    createRouter,
    createWebHistory
} from 'vue-router'
import routes from '~pages'

import NotFoundComponent from '@/components/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routes,
        { path: '/:pathMatch(.*)', component: NotFoundComponent }
    ],
})

export default router
