export const overrideMobileConfig = (config: Cypress.ConfigOptions) => {
    config.e2e!.viewportWidth = 400
    config.e2e!.viewportHeight = 660

    config.lighthouse!.options!.screenEmulation!.width = 400
    config.lighthouse!.options!.screenEmulation!.height = 660

    config.lighthouse!.options!.formFactor = 'mobile'
    config.lighthouse!.options!.screenEmulation!.mobile = true

    return config
}
