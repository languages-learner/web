import {
    type Ref,
    onScopeDispose,
    ref,
    watchEffect,
} from 'vue'
import { noop } from '@/utils/noop'
import { useIntersectionObserver } from '@/composables/intersectionObserver/useIntersectionObserver'

export const useVisibilityObserver = (target: Ref<HTMLDivElement | undefined>, autoUnobserve?: boolean) => {
    const isVisible = ref(false)
    const { intersectionObserve } = useIntersectionObserver()
    let stopObserve = noop
    let unwatch = noop
    const stop = (): void => {
        unwatch()
        stopObserve()
    }

    const updateValue = (value: boolean) => {
        isVisible.value = value
    }


    unwatch = watchEffect(() => {
        const el = target.value

        if (!el) {
            return
        }

        stopObserve()
        stopObserve = intersectionObserve(el, (entry) => {
            const visible = entry.intersectionRatio > 0

            /*
            * Element has been removed
            * */
            if (!entry.target.parentNode) {
                stopObserve()
            }

            updateValue(visible)
        }, autoUnobserve)
    })

    onScopeDispose(stop)

    return {
        isVisible,
        stop,
    }
}
