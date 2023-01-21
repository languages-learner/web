import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { EPageName } from '@/enums/EPageName'

export function setupRouterGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore()
        if (!to.meta.requiresAuth || userStore.isLoggedIn) return next()

        if (to.name !== EPageName.LANDING) {
            return router.replace({
                name: EPageName.LANDING,
            })
        }
    })
}
