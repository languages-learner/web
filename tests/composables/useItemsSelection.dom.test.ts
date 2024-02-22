import {
    describe,
    expect,
    it,
} from 'vitest'
import { withSetup } from '@@/tests/support/withSetup'

describe('composable/useItemsSelection', () => {
    it('correct initialization, select and unselect items', () => {
        const items = new Map([[0, {}], [1, {}]])
        const useF = withSetup(() => useItemsSelection(items))

        expect(useF.isAllItemsSelected.value).toBe(false)
        useF.toggleAllItemsSelection()
        expect(useF.isAllItemsSelected.value).toBe(true)
        useF.resetSelectedItems()
        expect(useF.isAllItemsSelected.value).toBe(false)
        useF.toggleItemSelection(0)
        expect(useF.isAllItemsSelected.value).toBe(false)
        expect(useF.selectedItems.size).toBe(1)
        expect(useF.selectedItems.get(0)).toBe(true)
        expect(useF.selectedItems.get(1)).toBe(undefined)
        useF.resetSelectedItems()
        expect(useF.selectedItems.size).toBe(0)
    })
})
