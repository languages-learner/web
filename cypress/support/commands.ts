/// <reference types="cypress" />

import { elSelector } from '@@/cypress/utils'
import { type EDataTest, type EDataTestClass } from '@/enums/EDataTest'

Cypress.Commands.add('el', (dataTest: EDataTest) => cy.get(elSelector(dataTest)))
Cypress.Commands.add('elByClass', (dataTestClass: EDataTestClass) => cy.get(`.${dataTestClass}`))

Cypress.Commands.add('clickOutside', () => {
    cy.log('click outside')

    return cy
        .get('body', { log: false })
        .click(0,0, { log: false })
})
