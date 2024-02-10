/// <reference types="cypress" />

declare namespace Cypress {
    interface LoginOptions {
        username?: string
        password?: string
        type?: 'signin' | 'signup'
        visitLoginPage?: boolean
        validateAuth?: boolean
    }
    interface Chainable {
        auth(options: LoginOptions = {}): Chainable<never>
        authWithoutSession(options: LoginOptions = {}): Chainable<never>
        logout(): Chainable<never>
        waitWorkspacePageInit(): Chainable<never>
    }
}
