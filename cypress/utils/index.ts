import { type EDataTest } from '@/enums/EDataTest'

export const elSelector = (dataTest: EDataTest) => `[data-test="${dataTest}"]`
export const withLang = (url: string = '') => `/${Cypress.env('language') || 'en'}${url}`
export const isMobile = () => Cypress.config('viewportWidth') < Cypress.env('mobileViewportWidthBreakpoint')
