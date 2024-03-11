/// <reference types="cypress" />

import { withLang } from '@@/cypress/utils'
import { EDataTest } from '@/enums/EDataTest'

describe('landing', () => {
    beforeEach(() => {
        cy.visit(withLang())
        cy.location('pathname').should('equal', withLang())
    })

    it('lighthouse', {
        env: {
            language: 'en',
        },
    }, () => {
        cy.lighthouse({
            performance: 80,
            accessibility: 75,
            'best-practices': 100,
            seo: 80,
        })
    })

    it('unauthenticated user', () => {
        cy
            .logout()
            .toMatchSnapshotForEl(EDataTest.landing_layout, 'Landing page content for unauthenticated user')
    })

    it('authenticated user', () => {
        cy
            .auth()
            .visit(withLang())
            .toMatchSnapshotForEl(EDataTest.landing_layout, 'Landing page content for authenticated user')
    })
})
