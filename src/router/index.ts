import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { initializeAuthenticateMiddleware } from '@/middlewares/authenticate'

import NotFoundComponent from '@/components/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routes,
        { path: '/:pathMatch(.*)', component: NotFoundComponent }
    ],
})

initializeAuthenticateMiddleware(router)

export default router
