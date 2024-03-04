export const overridePreviewConfig = (config: Cypress.ConfigOptions) => {
    config.e2e!.baseUrl = 'http://localhost:8080'

    return config
}
