import {
    Ref,
    unref,
    watch
} from 'vue'
import { useVisibilityObserver } from '@/composables/intersectionObserver/useVisibilityObserver'

export const useWordsLoadingOnScroll = (
    bottomElement: Ref<HTMLDivElement | undefined>,
    isWordsLoading: Ref<boolean>,
    fetchWords: () => Promise<void>
) => {
    const handleChanges = async () => {
        if (!unref(isVisible) || unref(isWordsLoading)) {
            return
        }

        await fetchWords()
    }

    const { isVisible } = useVisibilityObserver(bottomElement, true)

    watch(isVisible, handleChanges)
    watch(isWordsLoading, handleChanges)
}
