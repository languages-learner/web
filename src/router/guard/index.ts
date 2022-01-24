import { createPermissionGuard } from '@/router/guard/permissionGuard'
import { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
    createPermissionGuard(router)
}
