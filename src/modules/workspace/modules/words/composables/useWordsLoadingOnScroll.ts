import { unref, watch } from 'vue'
import type { Ref } from 'vue'
import { useVisibilityObserver } from '@/composables/intersectionObserver/useVisibilityObserver'

export const useWordsLoadingOnScroll = (
    bottomElement: Ref<HTMLDivElement | undefined>,
    isWordsLoading: Ref<boolean>,
    wasLoadedAtLeastOnce: Ref<boolean>,
    fetchWords: () => Promise<void>,
) => {
    const { isVisible } = useVisibilityObserver(bottomElement, true)

    const handleChanges = async () => {
        if (!unref(isVisible) || unref(isWordsLoading) || !unref(wasLoadedAtLeastOnce)) {
            return
        }

        await fetchWords()
    }

    watch(isVisible, handleChanges)
    watch(isWordsLoading, handleChanges)
}
