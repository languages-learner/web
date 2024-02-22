import { describe, expect } from 'vitest'
import { testApp } from '@@/tests/support/testApp'

describe('router', () => {
    testApp('should redirect unauthenticated user to landing page', async ({ app }) => {
        const router = app.runWithContext(() => useRouter())
        await router.push({ name: EPageName.DICTIONARY })
        expect(router.currentRoute.value.name).toBe(EPageName.LANDING)
    })
})
