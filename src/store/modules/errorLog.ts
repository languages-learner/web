import { defineStore } from 'pinia'
import type { ErrorLogInfo, ErrorLogInfoWithAdditionalData } from '@/models/ErrorLogInfo'

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
        errorLogInfoList,
        addErrorLogInfo,
    }
})
