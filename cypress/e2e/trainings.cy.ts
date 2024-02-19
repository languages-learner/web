/// <reference types="cypress" />

import { isMobile, withLang } from '@@/cypress/utils'
import { EDataTest } from '@/enums/EDataTest'
import { EPageName } from '@/enums/EPageName'

describe('workspace trainings', () => {
    it('navigate to /trainings using menu and view "Coming soon" status', () => {
        cy.auth()
        cy.visit(withLang('/dictionary')).waitWorkspacePageInit()

        if (isMobile())
            cy
                .getWorkspaceBottomMenuItem(EPageName.TRAININGS).should('be.visible').click()
        else
            cy
                .el(EDataTest.workspace_navigation_item).contains('trainings').click()

        cy
            .location('pathname').should('equal', withLang('/trainings'))
            .el(EDataTest.workspace_content).contains('coming_soon')
    })
})
