import { useErrorLogStoreWithOut } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import projectSetting from '@/settings/projectSetting'
import { App } from 'vue'
import { ComponentPublicInstance } from 'vue'

function formatComponentName(instance: ComponentPublicInstance | null) {
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

function vueErrorHandler(err: unknown, instance: ComponentPublicInstance | null, info: string) {
    const errorLogStore = useErrorLogStoreWithOut()
    const { name, path } = formatComponentName(instance)
    errorLogStore.addErrorLogInfo({
        type: EErrorType.VUE,
        name,
        file: path,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        message: err.message,
        detail: info,
        url: window.location.href,
    })
}

function registerPromiseErrorHandler() {
    window.addEventListener(
        'unhandledrejection',
        function (event) {
            const errorLogStore = useErrorLogStoreWithOut()
            errorLogStore.addErrorLogInfo({
                type: EErrorType.PROMISE,
                name: 'Promise Error!',
                detail: 'promise error!',
                url: window.location.href,
                message: event.reason,
            })
        },
        true,
    )
}

export function setupErrorHandle(app: App) {
    const { useErrorHandle } = projectSetting
    if (!useErrorHandle) {
        return
    }

    app.config.errorHandler = vueErrorHandler

    //  promise exception
    registerPromiseErrorHandler()
}
