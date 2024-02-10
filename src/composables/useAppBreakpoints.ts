import { useBreakpoints } from '@vueuse/core'
import { defaultBreakpoints } from 'naive-ui/es/config-provider/src/config'

export const useAppBreakpoints = () => {
    const breakpoints = useBreakpoints(defaultBreakpoints)
    const isMobile = breakpoints.smaller('s')

    return {
        isMobile,
    }
}
