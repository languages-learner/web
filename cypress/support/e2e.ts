/// <reference types="cypress" />

import './commands'
import { withLang } from '@@/cypress/utils'
import { EDataTest } from '@/enums/EDataTest'

beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

Cypress.Commands.add('authWithoutSession', (options = {}) => {
    const finalOptions: Cypress.LoginOptions = {
        ...(Cypress.env('testUser') ?? {}),
        ...{
            type: 'signin',
            visitLoginPage: true,
            validateAuth: true,
        },
        ...options,
    }
    const isSignIn = finalOptions.type === 'signin'
    // TODO Maybe replace to check path
    if (finalOptions.visitLoginPage)
        cy.visit(withLang())
    cy.el(isSignIn ? EDataTest.landing_sign_in_button : EDataTest.landing_sign_up_button).click()
    if (finalOptions.username)
        cy.el(EDataTest.authentication_modal_email).type(finalOptions.username)
    if (finalOptions.password)
        cy.el(EDataTest.authentication_modal_password).type(finalOptions.password)
    cy.el(EDataTest.authentication_modal_action_button)
        // .contains(isSignIn ? 'sign_in' : 'sign_up')
        .click()
    if (finalOptions.validateAuth)
        cy.location('pathname').should('equal', withLang('/dictionary'))
    else
        cy.wait(1000)
})

Cypress.Commands.add('auth', (options = {}) => {
    cy.session(
        [options.username, options.password, options.type],
        () => {
            cy.logout()
            cy.authWithoutSession(options)
        },
        {
            validate: async () => {
                cy.wrap(null).then(async () => {
                    expect((await indexedDB.databases()).map<string>(db => db.name ?? '').indexOf('firebaseLocalStorageDb')).not.to.equal(-1)
                })
                cy.visit(withLang('/dictionary'))
                cy.location('pathname').should('equal', withLang('/dictionary'))
                cy.waitWorkspacePageInit()
            },
        },
    )
})

Cypress.Commands.add('logout', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
})

Cypress.Commands.add('waitWorkspacePageInit', () => {
    cy.el(EDataTest.workspace_header_user_avatar, { timeout: 15000 }).should('exist').and('not.be.empty')
})
