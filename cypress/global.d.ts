/// <reference types="cypress" />

declare namespace Cypress {
    import { type ScreenshotOptions as CustomScreenshotOptions, type VisualRegressionResult } from 'cypress-visual-regression'
    import type { EDataTest, EDataTestClass } from '@/enums/EDataTest'
    import { type EPageName } from '@/enums/EPageName'
    import { type EWordStatus } from '@/services/dbstore/dto/Words'
    interface Chainable {
        toMatchSnapshot(name: string, options: CustomScreenshotOptions = {}): Chainable<VisualRegressionResult>
        toMatchSnapshotForEl(dataTest: EDataTest | EDataTestClass, name: string, options: CustomScreenshotOptions = {}): Chainable<VisualRegressionResult>

        el(dataTest: EDataTest, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLBodyElement>>
        elByClass(dataTestClass: EDataTestClass, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLBodyElement>>
        clickOutside(): Chainable<JQuery<HTMLHtmlElement>>

        // Common
        changeInterfaceLanguageUsingSelector(lang: string, options: {validate?: boolean} = {}): Chainable<JQuery<HTMLBodyElement>>

        // WorkspaceBottomMenu
        getWorkspaceBottomMenuItem(page: EPageName): Chainable<JQuery<HTMLBodyElement>>

        // Dictionary
        dictionaryAddWordWithTranslations(word: string, translations: string[], options: {clearInput?: boolean} = {}): Chainable<JQuery<HTMLBodyElement>>
        dictionaryFilterByWordStatus(status: EWordStatus): Chainable<JQuery<HTMLBodyElement>>
        dictionaryDeleteFirstWord(): Chainable<JQuery<HTMLBodyElement>>
        dictionaryGetWordsByStatus(status: EWordStatus): Chainable<JQuery<HTMLBodyElement>>
        dictionaryWaitWordsLoaded(): Chainable<never>
        dictionarySetSearchText(text?: string): Chainable<JQuery<HTMLElement>>
    }
}
