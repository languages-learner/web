/// <reference types="cypress" />

import { elSelector, withLang } from '@@/cypress/utils'
import { EDataTest, EDataTestClass } from '@/enums/EDataTest'

describe('user sign-in, sign-up and logout', () => {
    beforeEach(() => {
        cy.visit(withLang())
        cy.location('pathname').should('equal', withLang())
        cy.logout()
        cy.visit(withLang())
    })

    it('should redirect unauthenticated user to landing page', () => {
        cy.visit(withLang('/dictionary'))
        cy.location('pathname').should('equal', `/${Cypress.env('language')}`)
    })

    it('should allow to sign-in and logout', () => {
        cy
            .el(EDataTest.landing_sign_in_button).click()
            // To make close button unfocused
            .elByClass(EDataTestClass.app_card_content).should('be.visible').click()
            .get('html').toMatchSnapshot('Sign in modal')
            .get(`${elSelector(EDataTest.authentication_modal)} .n-base-close`).click()

            .authWithoutSession()
            .elByClass(EDataTestClass.app_notifications).should('be.visible').and('contain', 'successful_authorization')
            .location('pathname').should('equal', withLang('/dictionary'))

            .el(EDataTest.workspace_header_user_avatar).trigger('mouseenter')
            .get('.n-dropdown-option').contains('sign_out').click()
            .location('pathname').should('equal', withLang())
    })

    it('should display sign-in errors', () => {
        const authorizationError = 'authorization_error'
        const errorMessageInvalidEmail = 'Firebase: Error (auth/invalid-email)'
        const errorMessageInvalidCredential = 'Firebase: Error (auth/invalid-credential)'
        const errorMessageMissingPassword = 'Firebase: Error (auth/missing-password)'

        cy.authWithoutSession({
            username: 'not_email',
            password: '1',
            type: 'signin',
            visitLoginPage: true,
            validateAuth: false,
        })
        cy.elByClass(EDataTestClass.app_notifications)
            .should('be.visible')
            .and('contain', authorizationError)
            .and('contain', errorMessageInvalidEmail)
            .toMatchSnapshotForEl(EDataTestClass.app_notifications, 'Sign in error notification')
        cy
            .el(EDataTest.authentication_modal_error).should('be.visible').contains(errorMessageInvalidEmail)
            .get(`${elSelector(EDataTest.authentication_modal)} .n-base-close`).click()

        cy.authWithoutSession({
            username: '',
            password: '',
            type: 'signin',
            visitLoginPage: false,
            validateAuth: false,
        })
        cy.elByClass(EDataTestClass.app_notifications)
            .should('be.visible')
            .and('contain', authorizationError)
            .and('contain', errorMessageInvalidEmail)
        cy
            .el(EDataTest.authentication_modal_error).should('be.visible').contains(errorMessageInvalidEmail)
            .get(`${elSelector(EDataTest.authentication_modal)} .n-base-close`).click()

        cy.authWithoutSession({
            username: 'email@gmail.com',
            password: '1',
            type: 'signin',
            visitLoginPage: false,
            validateAuth: false,
        })
        cy.elByClass(EDataTestClass.app_notifications)
            .should('be.visible')
            .and('contain', authorizationError)
            .and('contain', errorMessageInvalidCredential)
        cy
            .el(EDataTest.authentication_modal_error).should('be.visible').contains(errorMessageInvalidCredential)
            .get(`${elSelector(EDataTest.authentication_modal)} .n-base-close`).click()

        cy.authWithoutSession({
            username: 'email@gmail.com',
            password: '',
            type: 'signin',
            visitLoginPage: false,
            validateAuth: false,
        })
        cy.elByClass(EDataTestClass.app_notifications)
            .should('be.visible')
            .and('contain', authorizationError)
            .and('contain', errorMessageMissingPassword)
        cy
            .el(EDataTest.authentication_modal_error).should('be.visible').contains(errorMessageMissingPassword)
            .get(`${elSelector(EDataTest.authentication_modal)} .n-base-close`).click()
    })

    it('should display sign-up error for existing use', () => {
        cy
            .el(EDataTest.landing_sign_up_button).click()
            // To make close button unfocused
            .elByClass(EDataTestClass.app_card_content).should('be.visible').click()
            .get('html').toMatchSnapshot('Sign up modal')
            .get(`${elSelector(EDataTest.authentication_modal)} .n-base-close`).click()

            .authWithoutSession({
                ...(Cypress.env('testUser') ?? {}),
                type: 'signup',
                validateAuth: false,
            })

        const errorMessage = 'Firebase: Error (auth/email-already-in-use)'
        cy.elByClass(EDataTestClass.app_notifications)
            .should('be.visible')
            .and('contain', errorMessage)
            .and('contain', 'registration_error')
        cy.el(EDataTest.authentication_modal_error).should('be.visible').contains(errorMessage)
    })
})
