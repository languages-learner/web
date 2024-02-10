import { createApp } from 'vue'

export const withSetup = <T>(composable: () => T): T => {
    let result: T
    const app = createApp({
        setup() {
            result = composable()

            return () => {}
        },
    })
    app.mount(document.createElement('div'))

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return result
}
