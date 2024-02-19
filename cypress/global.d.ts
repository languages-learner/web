/// <reference types="cypress" />

declare namespace Cypress {
    import type { EDataTest, EDataTestClass } from '@/enums/EDataTest'
    import { type EPageName } from '@/enums/EPageName'
    interface Chainable {
        el(dataTest: EDataTest, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLBodyElement>>
        elByClass(dataTestClass: EDataTestClass, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLBodyElement>>
        clickOutside(): Chainable<JQuery<HTMLBodyElement>>
        getWorkspaceBottomMenuItem(page: EPageName): Chainable<JQuery<HTMLBodyElement>>
    }
}
