/// <reference types="cypress" />

import {
    elSelector,
    isMobile,
    withLang,
} from '@@/cypress/utils'
import { EWordStatus } from '@/services/dbstore/dto/Words'
import { EDataTest, EDataTestClass } from '@/enums/EDataTest'
import { EPageName } from '@/enums/EPageName'
import { WordStatusTranslationKey } from '@/modules/workspace/modules/words/composables/useWordStatuses'

// TODO Tests for empty dictionary
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
            cy.dictionaryWaitWordsLoaded()
        })

        it('add word, edit word translations, status, and delete word', () => {
            const wordSource = `word-${new Date().valueOf()}`
            const translations = ['translation1', 'translation2', 'translation3']

            cy
                .log('create new word')
                .dictionarySetSearchText(wordSource)
                .dictionaryWaitWordsLoaded()
                .el(EDataTest.words_list_item).should('not.exist')
                .el(EDataTest.words_container_add_word_button).click()

                .log('close words creator')
                .el(EDataTest.words_creator).should('be.visible').within(() => {
                    cy.get('.n-base-close').click()
                })
                .el(EDataTest.words_creator).should('not.exist')

                .log('add translations')
                .el(EDataTest.words_container_add_word_button).eq(0).click()
                .el(EDataTest.words_creator).within(() => {
                    cy
                        .get('input').should('have.value', wordSource)

                        .log('set three translations')
                        .get(`${elSelector(EDataTest.words_creator_translations)} button`).type(translations[0]).clickOutside()
                        .el(EDataTest.words_creator_add_button).should('exist')
                        .get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(1).type(translations[1]).clickOutside()
                        .get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(2).type(translations[2]).clickOutside()

                        .log('delete second translation')
                        .get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(1).click()

                        .log('invoke creation')
                        .el(EDataTest.words_creator_add_button).click()
                })

                .log('check if word added with correct translations')
                .el(EDataTest.words_creator).should('not.exist')
                .dictionaryWaitWordsLoaded()
                .get(`${elSelector(EDataTest.words_container_header_search)} input`).should('have.value', '')
            if (isMobile())
                cy.el(EDataTest.words_container_header_status).contains('all')
            else
                cy.elByClass(EDataTestClass.words_container_header_status_active).contains('all')
            cy.el(EDataTest.words_list_item).first().within(() => {
                cy.el(EDataTest.words_list_item_source_word).should('contain.text', wordSource)
                    .el(EDataTest.words_list_item_translations).first()
                    .should('contain.text', translations[0])
                    .and('not.contain.text', translations[1])
                    .and('contain.text', translations[2])
            })

            const wordSourceEdited = wordSource.slice(0, wordSource.length - 1)
            cy
                .log('create similar word')
                .dictionarySetSearchText(wordSourceEdited)
                .dictionaryWaitWordsLoaded()
                .el(EDataTest.words_list_item).should('exist')
                .el(EDataTest.words_creator).should('not.exist')
                .dictionaryFilterByWordStatus(EWordStatus.LEARN)

                .log('check if words with other statuses are visible')
                .el(EDataTest.words_list_item).should('exist')

                .el(EDataTest.words_container_add_word_button).should('be.visible').click()
                .el(EDataTest.words_creator).should('be.visible')

                .log('check if words with other statuses are visible')
                .el(EDataTest.words_list_item).should('exist')

                .log('set translation')
                .get(`${elSelector(EDataTest.words_creator_translations)} button`).type(translations[0]).clickOutside()

                .log('invoke creation')
                .el(EDataTest.words_creator_add_button).click()
                .dictionaryWaitWordsLoaded()

                .log('check if two word added')
                .el(EDataTest.words_list_item).first().within(() => {
                    cy.el(EDataTest.words_list_item_source_word).should('contain.text', wordSourceEdited)
                })

            cy
                .log('check if unavailable add new word if word with other status exist')
                .log('change word status')
                .el(EDataTest.words_list_item_status).eq(0).trigger('mouseenter')
                .elByClass(EDataTestClass.word_status).contains(WordStatusTranslationKey[EWordStatus.LEARN]).should('be.visible').click()

                .log('check if status changed')
                .el(EDataTest.words_list_item_status).eq(0).should('have.attr', 'data-test-value', EWordStatus.LEARN)

                .log('check if there is word with other status and there is no "add word" button')
                .dictionarySetSearchText(wordSourceEdited)
                .dictionaryFilterByWordStatus(EWordStatus.NEW_WORD)
                .dictionaryGetWordsByStatus(EWordStatus.NEW_WORD).should('not.exist')
                .dictionaryGetWordsByStatus(EWordStatus.LEARN).should('exist').within(() => {
                    cy.get(`[data-test-value="${wordSourceEdited}"]`).should('exist')
                })
                .el(EDataTest.words_container_add_word_button).should('not.exist')

            cy.dictionarySetSearchText()

            const newTranslation = `translation-${new Date().valueOf()}`
            cy
                .el(EDataTest.words_list_item).first().within(() => {
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
                })

                .log('confirm deletion of the last translation')
                .elByClass(EDataTestClass.app_dialog).within(() => {
                    cy.elByClass(EDataTestClass.app_dialog_actions).within(() => {
                        cy.get('button').eq(1).click()
                    })
                })
                .el(EDataTest.words_list_item_edit_translations).should('not.exist')

                .log('check if word deleted')
                .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_source_word)}[data-test-value="${wordSourceEdited}"]`)
                .should('not.exist')

            cy
                .log('delete word using delete button')
                .el(EDataTest.words_list_item_delete_button).eq(0).click()
                .elByClass(EDataTestClass.app_popover).should('be.visible').within(() => {
                    cy.get('button').click()
                })

                .log('check if word deleted')
                .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_source_word)}[data-test-value="${wordSource}"]`)
                .should('not.exist')
        })

        it('select words', () => {
            cy.el(EDataTest.words_list_item).should(() => expect(true).eq(true)).then(($words) => {
                const wordSource = `word-${new Date().valueOf()}`
                for (let i = $words.length; i < 2; i++) {
                    cy.dictionaryAddWordWithTranslations(wordSource + `_${i}`, ['translation1'])
                }
            }).then(() => {
                cy
                    .log('select all words using header checkbox')
                    .el(EDataTest.words_container_header_checkbox).should('not.have.class', EDataTestClass.app_checkbox_checked)
                    .click().should('have.class', EDataTestClass.app_checkbox_checked)

                    .log('check if all words selected')
                    .el(EDataTest.words_list_item_checkbox).should('have.class', EDataTestClass.app_checkbox_checked)

                    .log('unselect first word')
                    .el(EDataTest.words_list_item_checkbox).eq(0).click()

                    .log('check if not all items selected')
                    .el(EDataTest.words_container_header_checkbox).should('not.have.class', EDataTestClass.app_checkbox_checked)

                    .log('select all words using header checkbox')
                    .el(EDataTest.words_container_header_checkbox).click()

                    .log('check if all words selected')
                    .el(EDataTest.words_list_item_checkbox).should('have.class', EDataTestClass.app_checkbox_checked)

                    .log('unselect all words using header checkbox')
                    .el(EDataTest.words_container_header_checkbox).click()

                    .log('check if all words unselected')
                    .el(EDataTest.words_list_item_checkbox).should('not.have.class', EDataTestClass.app_checkbox_checked)
            })
        })

        it('filter words by text and status', () => {
            let wordSource: string = ''
            cy.dictionaryGetWordsByStatus(EWordStatus.NEW_WORD).should(() => expect(true).eq(true)).then($words => {
                if (!$words.length) {
                    wordSource = `word-${new Date().valueOf()}`
                    cy.dictionaryAddWordWithTranslations(wordSource, ['translation1'])
                }

                cy
                    .dictionaryGetWordsByStatus(EWordStatus.NEW_WORD).eq(0)
                    .find(`${elSelector(EDataTest.words_list_item_source_word)}`)
                    .then($word => {
                        wordSource = $word.text()
                    })
            }).then(() => {
                cy
                    .log('enter search text with all words selected')
                    .el(EDataTest.words_container_header_checkbox).click()
                    .dictionarySetSearchText(wordSource)

                    .log('check if all words unselected')
                    .el(EDataTest.words_list_item_checkbox).should('not.have.class', EDataTestClass.app_checkbox_checked)

                    .log('check if all source words contain search word')
                    .el(EDataTest.words_list_item_source_word).should('contain', wordSource)

                    .log('change filtered status to "New work"')
                    .dictionaryFilterByWordStatus(EWordStatus.NEW_WORD)

                    .log('check if words found')
                    .el(EDataTest.words_list_item).should('exist')

                    .log('check if each founded word has filtered status')
                    .el(EDataTest.words_list_item_status).should('have.attr', 'data-test-value', EWordStatus.NEW_WORD)

                    .log('change status of first word to "Learn"')
                    .el(EDataTest.words_list_item_status).eq(0).trigger('mouseenter')
                    .elByClass(EDataTestClass.word_status).contains(WordStatusTranslationKey[EWordStatus.LEARN]).should('be.visible').click()

                    .log('check if word with another status still in list')
                    .el(EDataTest.words_list_item_status).eq(0).should('have.attr', 'data-test-value', EWordStatus.LEARN)

                    .log('change status of first word to "New word"')
                    .el(EDataTest.words_list_item_status).eq(0).trigger('mouseenter')
                    .elByClass(EDataTestClass.word_status).contains('new_word').should('be.visible').click()

                    .log('change filtered text')
                    .dictionarySetSearchText()

                cy
                    .log('check if filtered status changed to "All"')
                if (isMobile())
                    cy.el(EDataTest.words_container_header_status).contains('all')
                else
                    cy.elByClass(EDataTestClass.words_container_header_status_active).contains('all')

                const notExitedWordSource = `word-${new Date().valueOf()}`
                cy
                    .log('check if checkbox disabled if there is no words')
                    .dictionarySetSearchText(notExitedWordSource)
                    .el(EDataTest.words_container_header_checkbox).should('have.class', EDataTestClass.app_checkbox_disabled)
            })
        })
    })
})
