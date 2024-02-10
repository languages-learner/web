/// <reference types="cypress" />

import { EDataTest, EDataTestClass } from '@/enums/EDataTest'

describe('localization', () => {
    it('should redirect to url with lang', () => {
        cy.logout()
        cy.visit('/').location('pathname').should('equal', '/en')

        cy.auth({ validateAuth: false })
        cy.visit('/dictionary').location('pathname').should('match', new RegExp('^\\/[a-z]{2}'))
    })

    it('allow to change interface language for unauthorized user', () => {
        cy.logout()
        cy
            .visit('/xx')
            .location('pathname').should('equal', '/xx')
            .get('html').should('have.attr', 'lang', 'xx')

            .visit('/en')
            .location('pathname').should('equal', '/en')
            .get('html').should('have.attr', 'lang', 'en')
    })

    it('allow to change interface language for authorized user only in settings', {
        env: {
            language: '',
        },
    }, () => {
        cy.auth({ validateAuth: true })
        cy
            .visit('/en/office/settings')
            .waitWorkspacePageInit()

            .log('select russian language')
            .el(EDataTest.office_settings_interface_language).click()
            .elByClass(EDataTestClass.office_settings_interface_language_item).eq(1).click()
            .location('pathname').should('equal', '/ru/office/settings')
            .get('html').should('have.attr', 'lang', 'ru')
            .wait(1000)

            .log('select english language')
            .el(EDataTest.office_settings_interface_language).click()
            .elByClass(EDataTestClass.office_settings_interface_language_item).eq(0).click()
            .location('pathname').should('equal', '/en/office/settings')
            .get('html').should('have.attr', 'lang', 'en')
            .wait(1000)

            .log('unavailable to change interface language by changing url')
            .visit('/ru/office/settings')
            .location('pathname').should('equal', '/en/office/settings')
            .get('html').should('have.attr', 'lang', 'en')
    })
})
