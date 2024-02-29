/// <reference types="cypress" />

describe('localization', () => {
    it('allow to change interface language for authorized user only using selectors', {
        env: {
            language: '',
        },
    }, () => {
        cy.auth({ validateAuth: true })
        cy
            .log('change user interface language using landing page selector')
            .visit('/')
            .changeInterfaceLanguageUsingSelector('ru', { validate: true })
            .changeInterfaceLanguageUsingSelector('en', { validate: true })

            .log('change user interface language using settings page selector')
            .visit('/en/office/settings')
            .waitWorkspacePageInit()

            .changeInterfaceLanguageUsingSelector('ru', { validate: true })
            .changeInterfaceLanguageUsingSelector('en', { validate: true })

            .log('unavailable to change interface language by changing url')
            .visit('/ru/office/settings')
            .location('pathname').should('equal', '/en/office/settings')
            .get('html').should('have.attr', 'lang', 'en')
    })

    it('should redirect to url with lang', () => {
        cy.auth({ validateAuth: false })
        cy.visit('/dictionary').location('pathname').should('match', new RegExp('^\\/[a-z]{2}'))

        cy.logout()
        cy.visit('/').location('pathname').should('equal', '/en')
    })

    it('allow to change interface language for unauthorized user by changing url', () => {
        cy.logout()
        cy
            .visit('/xx')
            .location('pathname').should('equal', '/xx')
            .get('html').should('have.attr', 'lang', 'xx')

            .visit('/en')
            .location('pathname').should('equal', '/en')
            .get('html').should('have.attr', 'lang', 'en')
    })
})
