import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'
import { getErrorMessage } from '@/utils/error'
import { noop } from '@/utils/noop'

type TypeListener = (entry: IntersectionObserverEntry) => void;

// TODO Replace to useElementVisibility
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
                threshold: 1,
            })
        } catch (e) {
            addErrorLogInfo({ type: EErrorType.INTERSECTION_OBSERVER, message: getErrorMessage(e) })
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
