import { vi } from 'vitest'
import { createAppRouter } from '@/router'

export const useMocks = () => {
    const mockServices = () => {
        vi.mock('@/services/authentication/firebase/FirebaseAuthentication')
        vi.mock('@/services/dbstore/firestore/UserFirestoreCollection')
        vi.mock('@/services/dbstore/firestore/TranslationsFirestoreCollection')
        vi.mock('@/services/configuration/firebase/Config')
    }

    const mockI18n = () => {
        vi.mock('@/plugins/i18n')
    }

    const mockNotifications = async () => {
        vi.mock('naive-ui', async (importOriginal) => {
            return {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ...await importOriginal(),
                useNotification: () => ({
                    create: () => {},
                    info: () => {},
                    success: () => {},
                    warning: () => {},
                    error: () => {},
                    open: () => {},
                    destroyAll: () => {},
                }),
            }
        })
    }

    const routerBeforeEach = async () => {
        const router = createAppRouter()
        router.push({ name: router.currentRoute.value.name ?? EPageName.LANDING, params: { lang: TEST_INTERFACE_LANGUAGE_NAME } })
        await router.isReady()

        return router
    }

    return {
        mockServices,
        mockI18n,
        routerBeforeEach,
        mockNotifications,
    }
}
