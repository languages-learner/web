import { defineStore } from 'pinia'
import type { ErrorLogInfo, ErrorLogInfoWithAdditionalData } from '@/models/ErrorLogInfo'
import { store } from '@/store'
import { formatToDateTime } from '@/utils/dateUtil'

export const useErrorLogStore = defineStore('error-log', () => {
    const errorLogInfoList = reactive<ErrorLogInfoWithAdditionalData[]>([])

    const addErrorLogInfo = (data: ErrorLogInfo) => {
        errorLogInfoList.push({
            ...data,
            date: formatToDateTime(new Date()),
            url: window.location.href,
        })

        if (import.meta.env.DEV) {
            console.error(data)
        }
    }

    return {
        addErrorLogInfo,
    }
})

export function useErrorLogStoreWithOut() {
    return useErrorLogStore(store)
}
