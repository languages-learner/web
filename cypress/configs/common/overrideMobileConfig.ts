export const overrideMobileConfig = (config: Cypress.ConfigOptions) => {
    config.e2e!.viewportWidth = 400
    config.e2e!.viewportHeight = 660

    return config
}
