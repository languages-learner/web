import type { App , ComponentPublicInstance } from 'vue'

const formatComponentName = (instance: ComponentPublicInstance | null) => {
    const anonymous = {
        name: 'anonymous',
        path: 'anonymous',
    }

    if (!instance) return anonymous

    if (instance.$root === instance) {
        return {
            name: 'root',
            path: 'root',
        }
    }

    const options = instance.$options
    if (!options) return anonymous

    const name = options.name || options._componentTag

    return {
        name: name,
        path: options.__file,
    }
}

const vueErrorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    const errorLogStore = useErrorLogStore()
    const { name, path } = formatComponentName(instance)
    errorLogStore.addErrorLogInfo({
        type: EErrorType.VUE,
        name,
        file: path,
        message: getErrorMessage(err),
        detail: info,
    })
}

const registerPromiseErrorHandler = (test = false) => {
    const unhandledrejectionHandler = (event: PromiseRejectionEvent) => {
        const errorLogStore = useErrorLogStore()
        errorLogStore.addErrorLogInfo({
            type: EErrorType.PROMISE,
            name: 'Promise Error!',
            detail: 'promise error!',
            message: event.reason,
        })
    }

    if (!test)
        globalThis.addEventListener('unhandledrejection', unhandledrejectionHandler, true)
    else
        process.on('unhandledrejection', reason => {
            unhandledrejectionHandler(reason)
        })
}

export const setupErrorHandler = (app: App, test = false) => {
    app.config.errorHandler = vueErrorHandler

    // promise exception
    registerPromiseErrorHandler(test)
}
