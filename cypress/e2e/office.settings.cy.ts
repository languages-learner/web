/// <reference types="cypress" />

import { isMobile, withLang } from '@@/cypress/utils'
import { EPageName } from '@/enums/EPageName'
import { EDataTest } from '@/enums/EDataTest'

describe('office settings', () => {
    beforeEach(() => {
        cy.auth()
    })

    it('navigate to /office/settings using menu', () => {
        cy.visit(withLang('/dictionary')).waitWorkspacePageInit()
        cy
            .log('visit settings page using workspace menu')
            .el(EDataTest.workspace_header_user_avatar).trigger('mouseenter')
            .get('.n-dropdown-option').contains('settings').click()
            .location('pathname').should('equal', withLang('/office/settings'))

        if (!isMobile())
            cy
                .log('check if right office menu item selected')
                .el(EDataTest.office_menu).should('have.attr', 'data-test-value', EPageName.OFFICE_SETTINGS)

        if (isMobile())
            cy
                .log('visit settings page using bottom menu')
                .visit(withLang('/dictionary')).waitWorkspacePageInit()
                .getWorkspaceBottomMenuItem(EPageName.OFFICE_SETTINGS).should('be.visible').click()
        else
            cy
                .log('visit settings page using office menu')
                .el(EDataTest.office_menu).contains('profile').click()
                .location('pathname').should('equal', withLang('/office/profile'))
                .el(EDataTest.office_menu).contains('settings').click()

        cy
            .location('pathname').should('equal', withLang('/office/settings'))
            .toMatchSnapshotForEl(EDataTest.workspace_content, 'Office settings page')
    })
})
