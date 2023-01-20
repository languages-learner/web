import { useErrorLogStore } from '@/store/modules/errorLog'
import { onScopeDispose } from 'vue'
import { noop } from '@/utils/noop'
import { EErrorType } from '@/enums/EErrorType'

type TypeListener = (entry: IntersectionObserverEntry) => void;

export const useIntersectionObserver = () => {
    const { addErrorLogInfo } = useErrorLogStore()

    let observer: IntersectionObserver | undefined
    const listeners = new Map<Element, TypeListener>()
    const isSupported = 'IntersectionObserver' in window

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            const cb = listeners.get(entry.target)

            cb?.(entry)
        })
    }
    const intersectionUnobserve = (el?: Element): void => {
        if (!observer || !el) {
            return
        }
        observer.unobserve(el)
        listeners.delete(el)
    }
    const intersectionObserve = (target: Element | undefined, listener: TypeListener, autoUnobserve = true): () => void => {
        if (!observer || !target) {
            return noop
        }
        const unObserve = () => intersectionUnobserve(target)

        observer.observe(target)
        listeners.set(target, listener)

        if (autoUnobserve) {
            onScopeDispose(unObserve)
        }

        return unObserve
    }

    if (isSupported) {
        try {
            observer = new IntersectionObserver(onIntersection, {
                rootMargin: '100%',
            })
        } catch (e: any) {
            addErrorLogInfo({ type: EErrorType.INTERSECTION_OBSERVER, message: e.message })
        }
    }

    onScopeDispose(() => {
        observer?.disconnect()
        observer = undefined
    })

    return {
        isSupported,
        intersectionObserve,
        intersectionUnobserve,
    }
}
