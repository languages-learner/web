/// <reference types="cypress" />

import {
    elSelector,
    isMobile,
    withLang,
} from '@@/cypress/utils'
import { EWordStatus } from '@/services/dbstore/dto/Words'
import { EDataTest, EDataTestClass } from '@/enums/EDataTest'
import { EPageName } from '@/enums/EPageName'

describe('workspace dictionary', () => {
    beforeEach(() => {
        cy.auth()
    })

    describe('reachability', () => {
        it('navigate to /dictionary through the menu and view the list of words with clear filters', () => {
            cy
                .log('visit dictionary using landing button')
                .visit(withLang())
                .el(EDataTest.landing_go_to_workspace_button).click()
                .location('pathname').should('equal', withLang('/dictionary'))

            cy
                .log('visit dictionary using workspace menu')
                .visit(withLang('/trainings'))
            if (isMobile())
                cy.getWorkspaceBottomMenuItem(EPageName.DICTIONARY).click()
            else
                cy.el(EDataTest.workspace_navigation_item).contains('dictionary').click()
            cy.location('pathname').should('equal', withLang('/dictionary'))

            cy.log('check if filters are clear')
                .el(EDataTest.words_container_header_checkbox).should('not.be.checked')
                .el(EDataTest.words_container_header_search).should('have.value', '')

            if (isMobile())
                cy.el(EDataTest.words_container_header_status).contains('all')
            else
                cy.elByClass(EDataTestClass.words_container_header_status_active).contains('all')

        })
    })

    describe('functionality', () => {
        beforeEach(() => {
            cy.visit(withLang('/dictionary'))
            cy.waitWorkspacePageInit()
            cy.el(EDataTest.words_list_loader).should('not.exist')
        })

        it('add word, edit word translations, status, and delete word', () => {
            const wordSource = `word-${new Date().valueOf()}`
            const translations = ['translation1', 'translation2', 'translation3']

            cy
                .log('create new word')
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).type(wordSource)
                .el(EDataTest.words_list_loader).should('not.exist')
                .el(EDataTest.words_list_item).should('not.exist')
                .el(EDataTest.words_creator).should('contain.text', 'no_suitable_words')
                .el(EDataTest.words_container_header_add_word_button).click()
                .el(EDataTest.words_creator).should('contain.text', 'add_new_word')

                .log('set three translations')
                .get(`${elSelector(EDataTest.words_creator_translations)} button`).type(translations[0]).clickOutside()
                .el(EDataTest.words_creator_add_button).should('exist')
                .get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(1).type(translations[1]).clickOutside()
                .get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(2).type(translations[2]).clickOutside()

                .log('delete second translation')
                .get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(1).click()

                .log('invoke creation')
                .el(EDataTest.words_creator_add_button).click()

                .log('check if word added with correct translations')
                .el(EDataTest.words_creator).should('not.exist')
                .el(EDataTest.words_container_header_add_word_button).should('not.exist')
                .el(EDataTest.words_list_loader).should('not.exist')
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).should('have.value', wordSource)
                .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_source_word)}`).first().should('contain.text', wordSource)
                .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_translations)}`).first()
                .should('contain.text', translations[0])
                .and('not.contain.text', translations[1])
                .and('contain.text', translations[2])

            const wordSourceEdited = wordSource.slice(0, wordSource.length - 1)
            cy
                .log('create similar word')
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).clear().type(wordSourceEdited)
                .el(EDataTest.words_list_loader).should('not.exist')
                .el(EDataTest.words_list_item).should('exist')
                .el(EDataTest.words_creator).should('not.exist')
                .el(EDataTest.words_container_header_add_word_button).click()
                .el(EDataTest.words_creator).should('exist').and('contain.text', 'add_new_word')

                .log('set translation')
                .get(`${elSelector(EDataTest.words_creator_translations)} button`).type(translations[0]).clickOutside()

                .log('invoke creation')
                .el(EDataTest.words_creator_add_button).click()

                .log('check if two words with similar translations found')
                .el(EDataTest.words_list_item).should('have.length', 2)

            cy
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).clear()
                .el(EDataTest.words_list_loader).should('not.exist')

            cy
                .log('change word status')
                .el(EDataTest.words_list_item_status).eq(0).trigger('mouseenter')
                .get('.n-base-select-menu-option-wrapper > :nth-child(2)').click()

                .log('check if status changed')
                .el(EDataTest.words_list_item_status).eq(0).should('have.attr', 'data-test-value', EWordStatus.LEARN)

            const newTranslation = `translation-${new Date().valueOf()}`
            cy
                .log('add translation to existing word')
                .el(EDataTest.words_list_item_edit_button).eq(0).click()
                .get(`${elSelector(EDataTest.words_list_item_edit_translations)} button`).last().type(newTranslation).clickOutside()
                .el(EDataTest.words_list_item_edit_translations).should('contain.text', newTranslation)

                .log('delete word by deleting all translations')
                .get(`${elSelector(EDataTest.words_list_item_edit_translations)} button`).eq(-2).click()
                .el(EDataTest.words_list_item_edit_translations).should('not.contain.text', newTranslation)
                .get(`${elSelector(EDataTest.words_list_item_edit_translations)} button`).each((_, index, $btns) => {
                    if (index !== $btns.length - 1) {
                        // Click to the first element each time
                        cy.get(`${elSelector(EDataTest.words_list_item_edit_translations)} button`).eq(0).then(($btn) => {
                            cy.wrap($btn).click()
                        })
                        cy.wait(1000)
                    }
                })
                .el(EDataTest.words_list_item_edit_translations).should('not.exist')

                .log('check if word deleted')
                .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_source_word)}`).first().should('not.have.text', wordSourceEdited)

            cy
                .log('delete word using delete button')
                .el(EDataTest.words_list_item_delete_button).eq(0).click()

                .log('check if word deleted')
                .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_source_word)}`).first().should('not.contain.text', wordSource)
        })

        // Note: test account has words
        it('select words', () => {
            cy
                .log('select all words using header checkbox')
                .el(EDataTest.words_container_header_checkbox).should('not.have.class', 'n-checkbox--checked')
                .click().should('have.class', 'n-checkbox--checked')

                .log('check if all words selected')
                .el(EDataTest.words_list_item_checkbox).should('have.class', 'n-checkbox--checked')

                .log('unselect first word')
                .el(EDataTest.words_list_item_checkbox).eq(0).click()

                .log('check if not all items selected')
                .el(EDataTest.words_container_header_checkbox).should('not.have.class', 'n-checkbox--checked')

                .log('select all words using header checkbox')
                .el(EDataTest.words_container_header_checkbox).click()

                .log('check if all words selected')
                .el(EDataTest.words_list_item_checkbox).should('have.class', 'n-checkbox--checked')

                .log('unselect all words using header checkbox')
                .el(EDataTest.words_container_header_checkbox).click()

                .log('check if all words unselected')
                .el(EDataTest.words_list_item_checkbox).should('not.have.class', 'n-checkbox--checked')
        })

        // Note: test account has words with the necessary source words and statuses
        it('filter by text and status', () => {
            const searchText = 'test1'
            cy
                .log('enter search text with all words selected')
                .el(EDataTest.words_container_header_checkbox).click()
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).type(searchText).should('have.value', searchText)

                .log('check if all words unselected')
                .el(EDataTest.words_list_item_checkbox).should('not.have.class', 'n-checkbox--checked')

                .log('check if all source words contain search word')
                .el(EDataTest.words_list_item_source_word).should('contain', searchText)

            cy
                .log('change filtered status to "Learned"')
            if (isMobile())
                cy
                    .el(EDataTest.words_container_header_status).click()
                    .elByClass(EDataTestClass.words_container_header_status).contains('learned').click()
            else
                cy.el(EDataTest.words_container_header_status).eq(EWordStatus.LEARNED + 1).click()

            cy
                .log('check if words not found')
                .el(EDataTest.words_list_item).should('not.exist')

            cy.log('change filtered status to "New work"')
            if (isMobile())
                cy
                    .el(EDataTest.words_container_header_status).click()
                    .elByClass(EDataTestClass.words_container_header_status).contains('new_word').click()
            else
                cy.el(EDataTest.words_container_header_status).eq(EWordStatus.NEW_WORD + 1).click()

            cy
                .log('check if words found')
                .el(EDataTest.words_list_item).should('exist')

                .log('check if each founded word has filtered status')
                .el(EDataTest.words_list_item_status).should('have.attr', 'data-test-value', EWordStatus.NEW_WORD)

                .log('change status of first word to "Learn"')
                .el(EDataTest.words_list_item_status).eq(0).trigger('mouseenter')
                .elByClass(EDataTestClass.word_status).contains('learn').should('be.visible').click()

                .log('check if word with another status still in list')
                .el(EDataTest.words_list_item_status).eq(0).should('have.attr', 'data-test-value', EWordStatus.LEARN)

                .log('change status of first word to "New word"')
                .el(EDataTest.words_list_item_status).eq(0).trigger('mouseenter')
                .elByClass(EDataTestClass.word_status).contains('new_word').should('be.visible').click()

                .log('change filtered text')
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).clear().should('have.value', '')

            cy
                .log('check if filtered status changed to "All"')
            if (isMobile())
                cy.el(EDataTest.words_container_header_status).contains('all')
            else
                cy.elByClass(EDataTestClass.words_container_header_status_active).contains('all')
        })
    })
})
