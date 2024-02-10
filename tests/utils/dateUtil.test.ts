import { expect, it } from 'vitest'
import { EDateFormat, formatToDateTime } from '@/utils/dateUtil'

it('util/formatToDateTime', () => {
    expect(formatToDateTime(new Date(2000, 2, 31))).toBe('2000-03-31 00:00:00')
    expect(formatToDateTime(new Date(2000, 2, 31), EDateFormat.DATE_ONLY)).toBe('2000-03-31')
})
