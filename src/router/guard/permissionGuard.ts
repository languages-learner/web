import { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/modules/user'
import { EPageName } from '@/enums/EPageName'

export function createPermissionGuard(router: Router) {
    const userStore = useUserStoreWithOut()

    router.beforeEach((to, from, next) => {
        if (userStore.isLoggedIn) {
            if (to.name === EPageName.SIGNIN || to.name === EPageName.SIGNUP) {
                return router.replace({
                    name: EPageName.BASE_HOME
                })
            }

            return next()
        }

        if (!to.meta.requiresAuth) return next()

        if (to.name !== EPageName.SIGNIN && to.name !== EPageName.SIGNUP) {
            return router.replace({
                name: EPageName.SIGNIN
            })
        }
    })
}
