import {
    beforeEach,
    describe,
    expect,
    it,
} from 'vitest'
import { createApp } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { setupErrorHandler } from '@/plugins/errorHandler'
import { EErrorType } from '@/enums/EErrorType'

describe('plugin/errorHandler', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('vueErrorHandler', async () => {
        const app = createApp({
            setup() {
                throw new Error('vueErrorHandler')
            },
            render: () => h('<div></div>'),
        })
        setupErrorHandler(app)
        app.mount(document.createElement('div'))
        const errorLogStore = useErrorLogStore()
        expect(errorLogStore.errorLogInfoList).length.greaterThan(0)
        const errorLog = errorLogStore.errorLogInfoList.at(0)
        expect(errorLog).toEqual({
            date: errorLog!.date,
            detail: 'setup function',
            file: 'root',
            message: 'vueErrorHandler',
            name: 'root',
            type: EErrorType.VUE,
            url: errorLog!.url,
        })
    })

    it('unhandledrejection', async () => {
        const app = createApp({
            render: () => h('<div></div>'),
        })
        setupErrorHandler(app, true)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        process.emit('unhandledrejection', { reason: 'unhandledrejection' })
        const errorLogStore = useErrorLogStore()
        expect(errorLogStore.errorLogInfoList).length.greaterThan(0)
        const errorLog = errorLogStore.errorLogInfoList.at(0)
        expect(errorLog).toEqual({
            type: 'promise',
            name: 'Promise Error!',
            detail: 'promise error!',
            message: 'unhandledrejection',
            date: errorLog!.date,
            url: errorLog!.url,
        })
    })
})

