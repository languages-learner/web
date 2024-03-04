/// <reference types="cypress" />

import { withLang } from '@@/cypress/utils'
import { EDataTest } from '@/enums/EDataTest'

describe('landing', () => {
    beforeEach(() => {
        cy.visit(withLang())
        cy.location('pathname').should('equal', withLang())
    })

    it('unauthenticated user', () => {
        cy
            .logout()
            .visit(withLang())
            .toMatchSnapshotForEl(EDataTest.landing_layout, 'Landing page content for unauthenticated user')
    })

    it('authenticated user', () => {
        cy
            .visit(withLang())
            .auth()
            .visit(withLang())
            .toMatchSnapshotForEl(EDataTest.landing_layout, 'Landing page content for authenticated user')
    })
})
