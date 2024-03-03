import { expect, it } from 'vitest'

it('util/string/toLowerCase', () => {
    expect(toLowerCase('')).toBe('')
    expect(toLowerCase('QWe')).toBe('qwe')
    expect(toLowerCase(['QWe', 'QWe'])).toEqual(['qwe', 'qwe'])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(toLowerCase(1)).toBe(1)
})
