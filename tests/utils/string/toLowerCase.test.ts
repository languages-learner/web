import { expect, it } from 'vitest'

it('util/string/toLowerCase', () => {
    expect(toLowerCase('')).toBe('')
    expect(toLowerCase('QWe')).toBe('qwe')
    expect(toLowerCase(['QWe', 'QWe'])).toEqual(['qwe', 'qwe'])
})
