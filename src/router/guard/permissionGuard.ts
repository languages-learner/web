import { Router } from 'vue-router'
import { useUserStoreWithOut } from '@/store/user'
import { PageEnum } from '@/enums/pageEnum'

export function createPermissionGuard(router: Router) {
    const userStore = useUserStoreWithOut()

    router.beforeEach((to, from, next) => {
        if (userStore.isLoggedIn) {
            if (to.name === PageEnum.BASE_SIGNIN || to.name === PageEnum.BASE_SIGNUP) {
                return router.replace({
                    name: PageEnum.BASE_HOME
                })
            }

            return next()
        }

        if (!to.meta.requiresAuth) return next()

        if (to.name !== PageEnum.BASE_SIGNIN && to.name !== PageEnum.BASE_SIGNUP) {
            return router.replace({
                name: PageEnum.BASE_SIGNIN
            })
        }
    })
}
