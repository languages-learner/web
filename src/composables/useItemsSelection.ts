import {
    type UnwrapNestedRefs,
    computed,
    reactive,
    unref,
} from 'vue'

export const useItemsSelection = <T extends Record<any, any>>(items: T) => {
    const selectedItems = reactive<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)

    const isAllItemsSelected = computed(() =>
        Object.keys(items).length > 0 &&
        Object.keys(selectedItems).length === Object.keys(items).length,
    )

    const toggleItemSelection = (key: keyof T) => {
        if (!selectedItems[key])
            selectedItems[key] = true as UnwrapNestedRefs<T>[keyof T]
        else
            delete selectedItems[key]
    }

    const toggleAllItemsSelection = () => {
        if (!unref(isAllItemsSelected)) {
            Object.keys(items).forEach((key: keyof T) => {
                selectedItems[key] = true as UnwrapNestedRefs<T>[keyof T]
            })

            return
        }

        Object.keys(selectedItems).forEach(key => {
            delete selectedItems[key]
        })
    }

    const resetSelectedItems = () => {
        Object.keys(selectedItems).forEach(key => {
            delete selectedItems[key]
        })
    }

    return {
        selectedItems,
        isAllItemsSelected,
        toggleItemSelection,
        toggleAllItemsSelection,
        resetSelectedItems,
    }
}
