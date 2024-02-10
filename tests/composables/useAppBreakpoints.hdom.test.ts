import { withSetup } from '@@/tests/support/withSetup'
import { describe, expect } from 'vitest'
import { testApp } from '@@/tests/support/testApp'
import { useAppBreakpoints } from '@/composables/useAppBreakpoints'

describe('composable/useAppBreakpoints', () => {
    testApp('returns', () => {
        const results: Array<{ width: number, isMobile: boolean }> = []
        for (let i = 10; i <= 5000; i += 10) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // TODO Try vi.stubGlobal('innerWidth', 100)
            window.happyDOM.setInnerWidth(i)

            const useF = withSetup(() => useAppBreakpoints())
            // To save order
            results.push({ width: i, isMobile: useF.isMobile.value })
        }

        expect(results).toMatchSnapshot()
    })
})
