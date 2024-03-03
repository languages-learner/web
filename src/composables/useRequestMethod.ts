import { noop } from '@vueuse/core'
// Without direct import get error in template
import { type Ref, type WritableComputedRef } from 'vue'

type RequestMethodOptions = {
    allowConcurrentRequests: boolean
    autoSetLoadingStatus: boolean
    executeCondition?: () => boolean
}

// TODO Use useAsyncState - https://vueuse.org/core/useAsyncState/#useasyncstate
export const useRequestMethod = <V, F extends (
    abortController: AbortController,
    isLoading: WritableComputedRef<boolean>,
    wasLoadedAtLeastOnce: WritableComputedRef<boolean>,
) => Promise<V>>(f: F, options: RequestMethodOptions): {
    isLoading: Readonly<Ref<boolean>>
    wasLoadedAtLeastOnce: Readonly<Ref<boolean>>
    execute: () => Promise<void>
    reset: () => void
} => {
    let lastRequestId = 0
    const abortControllers: AbortController[] = []
    const isLoading = ref(false)
    const wasLoadedAtLeastOnce = ref(false)

    const isLastRequest = (requestId: number) => lastRequestId === requestId

    const abortAll = () => {
        abortControllers.forEach((abortController, index) => {
            abortController.abort()
            delete abortControllers[index]
        })
    }

    const execute = async () => {
        const requestId = ++lastRequestId
        if (!options.allowConcurrentRequests) {
            abortAll()
        }

        if (options.executeCondition && !options.executeCondition()) {
            return
        }

        const abortController = new AbortController()
        abortControllers.push(abortController)

        if (options.autoSetLoadingStatus) {
            isLoading.value = true
        }
        const isLoadingForRequest = computed({
            get() {
                return unref(isLoading)
            },
            set(value: boolean) {
                if (isLastRequest(requestId)) {
                    isLoading.value = value
                }
            },
        })

        const wasLoadedAtLeastOnceForRequest = computed({
            get() {
                return unref(wasLoadedAtLeastOnce)
            },
            set(value: boolean) {
                if (isLastRequest(requestId)) {
                    wasLoadedAtLeastOnce.value = value
                }
            },
        })

        f(
            abortController,
            isLoadingForRequest,
            wasLoadedAtLeastOnceForRequest,
        )
            .then(() => {
                if (options.autoSetLoadingStatus) {
                    wasLoadedAtLeastOnceForRequest.value = true
                }
            })
            .catch(() => noop())
            .finally(() => {
                if (options.autoSetLoadingStatus) {
                    isLoadingForRequest.value = false
                }
            })
    }

    const reset = () => {
        abortAll()
        isLoading.value = false
        wasLoadedAtLeastOnce.value = false
    }

    return {
        isLoading: readonly(isLoading),
        wasLoadedAtLeastOnce: readonly(wasLoadedAtLeastOnce),
        execute,
        reset,
    }
}
