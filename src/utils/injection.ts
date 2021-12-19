import { inject } from 'vue'
import {InjectionKey} from "@vue/runtime-core";

export const injectStrict = <T>(key: InjectionKey<T>): T => {
    const resolved = inject(key)
    if (!resolved) {
        throw new Error(`Could not resolve ${key}`)
    }

    return resolved
}
