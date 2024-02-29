import { withSetup } from '@@/tests/support/withSetup'
import { describe, expect } from 'vitest'
import { testApp } from '@@/tests/support/testApp'

describe('composable/useAppBreakpoints', () => {
    testApp('returns', () => {
        const results = []
        for (let i = 10; i <= 5000; i += 10) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.happyDOM.setInnerWidth(i)

            const useF = withSetup(() => useAppBreakpoints())
            // To save order
            results.push({
                width: i,
                output: {
                    isMobile: useF.isMobile.value,
                    isTablet: useF.isTablet.value,
                },
            })
        }

        expect(results).toMatchSnapshot()
    })
})
