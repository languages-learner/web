import { useBreakpoints } from '@vueuse/core'
import { defaultBreakpoints } from 'naive-ui/es/config-provider/src/config'

export const useAppBreakpoints = () => {
    const breakpoints = useBreakpoints({
        mobile: defaultBreakpoints.s,
        tablet: defaultBreakpoints.m,
    })
    const isMobile = breakpoints.smaller('mobile')
    const isTablet = breakpoints.between('mobile', 'tablet')

    return {
        isMobile,
        isTablet,
    }
}
