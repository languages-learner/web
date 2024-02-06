export const useVirtualScrollListItemEmits = () => {
    const destination = getCurrentInstance()?.parent?.parent
    const sendEmitToList = (name: string, ...payload: unknown[]) => {
        destination?.emit(name, ...payload)
    }

    return {
        sendEmitToList,
    }
}
