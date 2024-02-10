import { expect, it } from 'vitest'
import { getErrorMessage } from '@/utils/error'

it('util/error', () => {
    expect(getErrorMessage(1)).toBe('1')
    expect(getErrorMessage(null)).toBe('null')
    expect(getErrorMessage({})).toBe('{}')
    expect(getErrorMessage({ message: '' })).toBe('')
})
