/// <reference types="cypress" />

import { withLang } from '@@/cypress/utils'
import { EPageName } from '@/enums/EPageName'
import { EDataTest } from '@/enums/EDataTest'

describe('office profile', () => {
    beforeEach(() => {
        cy.auth()
    })

    it('navigate to /office/profile using menu and view user email in profile', () => {
        cy.visit(withLang('/dictionary')).waitWorkspacePageInit()
        cy
            .log('visit profile page using workspace menu')
            .el(EDataTest.workspace_header_user_avatar).trigger('mouseenter')
            .get('.n-dropdown-option').contains('profile').click()
            .location('pathname').should('equal', withLang('/office/profile'))

            .log('check if right office menu item selected')
            .el(EDataTest.office_menu).should('have.attr', 'data-test-value', EPageName.OFFICE_PROFILE)

            .log('check if display email')
            .el(EDataTest.office_profile_email).should('contain', Cypress.env('testUser').username)

            .log('visit profile page using office menu')
            .el(EDataTest.office_menu).contains('settings').click()
            .location('pathname').should('equal', withLang('/office/settings'))
            .el(EDataTest.office_menu).contains('profile').click()
            .location('pathname').should('equal', withLang('/office/profile'))
    })
})
