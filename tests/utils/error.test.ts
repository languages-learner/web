import { expect, it } from 'vitest'

it('util/error', () => {
    expect(getErrorMessage(1)).toBe('1')
    expect(getErrorMessage(null)).toBe('null')
    expect(getErrorMessage({})).toBe('{}')
    expect(getErrorMessage({ message: '' })).toBe('')
})
