/// <reference types="cypress" />

import { withLang } from '@@/cypress/utils'
import { EDataTest } from '@/enums/EDataTest'

describe('workspace trainings', () => {
    it('navigate to /trainings using menu and view "Coming soon" status', () => {
        cy.auth()
        cy.visit(withLang('/dictionary'))
        cy
            .el(EDataTest.workspace_navigation_item).contains('trainings').click()
            .location('pathname').should('equal', withLang('/trainings'))
            .el(EDataTest.workspace_content).contains('coming_soon')
    })
})
