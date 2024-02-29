/// <reference types="cypress" />

import { elSelector, isMobile } from '@@/cypress/utils'
import { EDataTest, EDataTestClass } from '@/enums/EDataTest'
import { EPageName } from '@/enums/EPageName'
import { type EWordStatus } from '@/services/dbstore/dto/Words'
import { WordStatusTranslationKey } from '@/modules/workspace/modules/words/composables/useWordStatuses'

Cypress.Commands.add('el', (dataTest: EDataTest, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) =>
    cy.get(elSelector(dataTest), options))
Cypress.Commands.add('elByClass', (dataTestClass: EDataTestClass, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) =>
    cy.get(`.${dataTestClass}`, options))

Cypress.Commands.add('clickOutside', () => {
    cy.log('click outside')

    return cy
        .root({ log: false })
        .click(0,0, { log: false })
})

Cypress.Commands.add('getWorkspaceBottomMenuItem', (page: EPageName) => {
    switch (page) {
    case EPageName.OFFICE_PROFILE:
    case EPageName.OFFICE_SETTINGS:
        return cy
            .get(`${elSelector(EDataTest.workspace_bottom_menu_item)}[data-test-value="${EPageName.OFFICE}"]`).click()
            .get(`${elSelector(EDataTest.workspace_bottom_menu_item)}[data-test-value="${page}"]`)
    default:
        return cy
            .get(`${elSelector(EDataTest.workspace_bottom_menu_item)}[data-test-value="${page}"]`)
            .parent()
            .parent()
    }
})

Cypress.Commands.add('dictionaryAddWordWithTranslations', (word, translations, options = {
    clearInput: true,
}) => {
    cy
        .get(`${elSelector(EDataTest.words_container_header_search)} input`).type(word)
        .el(EDataTest.words_list_loader).should('not.exist')
        .el(EDataTest.words_list_item).should('not.exist')
        .el(EDataTest.words_container_add_word_button).click()
        .el(EDataTest.words_creator).should('contain.text', 'add_new_word')

    translations.forEach((translation, index) => {
        cy.get(`${elSelector(EDataTest.words_creator_translations)} button`).eq(index).type(translation).clickOutside()
    })

    cy
        .el(EDataTest.words_creator_add_button).click()
        .el(EDataTest.words_creator).should('not.exist')
        .el(EDataTest.words_container_add_word_button).should('not.exist')
        .el(EDataTest.words_list_loader).should('not.exist')
        .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_source_word)}`).first().should('contain.text', word)
        .get(`${elSelector(EDataTest.words_list_item)} ${elSelector(EDataTest.words_list_item_translations)}`).first().then($translations => {
            translations.forEach((translation) => {
                cy.wrap($translations).should('contain.text', translation)
            })
        })

    if (options.clearInput)
        cy
            .get(`${elSelector(EDataTest.words_container_header_search)} input`).clear().should('have.value', '')
            .el(EDataTest.words_list_loader).should('not.exist')
})

Cypress.Commands.add('dictionaryFilterByWordStatus', (status: EWordStatus) => {
    if (isMobile())
        cy
            .el(EDataTest.words_container_header_status).click()
            .elByClass(EDataTestClass.words_container_header_status).contains(WordStatusTranslationKey[status]).click()
    else
        cy.el(EDataTest.words_container_header_status).eq(status + 1).click()
})

Cypress.Commands.add('dictionaryDeleteFirstWord', () => {
    cy.el(EDataTest.words_list_item_delete_button).eq(0).click()
})

Cypress.Commands.add('dictionaryGetWordsByStatus', (status: EWordStatus) => {
    return cy.get(`${elSelector(EDataTest.words_list_item)}:has(${elSelector(EDataTest.words_list_item_status)}[data-test-value="${status}"])`)
})

Cypress.Commands.add('dictionaryWaitWordsLoaded', () => {
    cy
        .el(EDataTest.words_list_loader).should('exist')
        .el(EDataTest.words_list_loader).should('not.exist')
})

Cypress.Commands.add('dictionarySetSearchText', (text?: string) => {
    if (text)
        return cy.get(`${elSelector(EDataTest.words_container_header_search)} input`).type(text)
    else
        return cy.get(`${elSelector(EDataTest.words_container_header_search)} input`).clear()
})

Cypress.Commands.add('changeInterfaceLanguageUsingSelector', (lang: string, options = {}) => {
    cy
        .el(EDataTest.interface_language_selector).should('exist').click()
        .get(`${elSelector(EDataTest.interface_language_selector_item)}[data-test-value="${lang}"]`).eq(0).should('exist').click()
        .wait(1000)

    if (options.validate) {
        cy
            .location('pathname').should('have.string', `/${lang}`)
            .get('html').should('have.attr', 'lang', lang)
    }
})
