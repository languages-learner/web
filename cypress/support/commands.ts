/// <reference types="cypress" />

import { elSelector } from '@@/cypress/utils'
import { EDataTest, type EDataTestClass } from '@/enums/EDataTest'
import { EPageName } from '@/enums/EPageName'

Cypress.Commands.add('el', (dataTest: EDataTest, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) =>
    cy.get(elSelector(dataTest), options))
Cypress.Commands.add('elByClass', (dataTestClass: EDataTestClass, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) =>
    cy.get(`.${dataTestClass}`, options))

Cypress.Commands.add('clickOutside', () => {
    cy.log('click outside')

    return cy
        .get('body', { log: false })
        .click(0,0, { log: false })
})

Cypress.Commands.add('getWorkspaceBottomMenuItem', (page: EPageName) => {
    switch (page) {
    case EPageName.OFFICE_PROFILE:
    case EPageName.OFFICE_SETTINGS:
        return cy
            .get(`${elSelector(EDataTest.workspace_bottom_menu_item)}[data-test-value="${EPageName.OFFICE}"]`).click()
            .get(`${elSelector(EDataTest.workspace_bottom_menu_item)}[data-test-value="${page}"]`)
    default:
        return cy
            .get(`${elSelector(EDataTest.workspace_bottom_menu_item)}[data-test-value="${page}"]`)
            .parent()
            .parent()
    }
})
