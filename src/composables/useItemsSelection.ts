export const useItemsSelection = <Key extends number | string | symbol, Data>(items: Map<Key, Data>) => {
    const selectedItems = reactive<Map<Key, boolean>>(new Map()) as Map<Key, boolean>

    const isAllItemsSelected = computed(() =>
        items.size > 0 &&
        items.size === selectedItems.size,
    )

    const toggleItemSelection = (key: Key) => {
        if (!selectedItems.has(key))
            selectedItems.set(key, true)
        else
            selectedItems.delete(key)
    }

    const toggleAllItemsSelection = () => {
        if (!unref(isAllItemsSelected)) {
            if (items instanceof Map) {
                items.forEach((value, key) => {
                    selectedItems.set(key as Key, true)
                })
            }

            return
        }

        selectedItems.clear()
    }

    const resetSelectedItems = () => selectedItems.clear()

    return {
        selectedItems,
        isAllItemsSelected,
        toggleItemSelection,
        toggleAllItemsSelection,
        resetSelectedItems,
    }
}
