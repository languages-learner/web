import type { App } from 'vue'
import type { Router } from 'vue-router'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setupI18n = async (router: Router, app: App) => {}

export const useI18n = () => {
    return {
        t: (tKey: string) => tKey,
        locale: TEST_INTERFACE_LANGUAGE_NAME,
        availableLocales: [],
        setLocaleMessage: () => {},
    }
}
