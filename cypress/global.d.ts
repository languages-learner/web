/// <reference types="cypress" />

declare namespace Cypress {
    import type { EDataTest, EDataTestClass } from '@/enums/EDataTest'
    interface Chainable {
        el(dataTest: EDataTest): Chainable<JQuery<HTMLBodyElement>>
        elByClass(dataTestClass: EDataTestClass): Chainable<JQuery<HTMLBodyElement>>
        clickOutside(): Chainable<JQuery<HTMLBodyElement>>
    }
}
