import { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { EPageName } from '@/enums/EPageName'

export function createPermissionGuard(router: Router) {
    const userStore = useUserStoreWithOut()

    router.beforeEach((to, from, next) => {
        if (!to.meta.requiresAuth || userStore.isLoggedIn) return next()

        if (to.name !== EPageName.MAIN_PAGE) {
            return router.replace({
                name: EPageName.MAIN_PAGE
            })
        }
    })
}
