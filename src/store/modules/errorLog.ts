import { defineStore } from 'pinia'
import { store } from '@/store'
import { ErrorLogInfo, ErrorLogInfoWithAdditionalData } from '@/models/ErrorLogInfo'
import { formatToDateTime } from '@/utils/dateUtil'
import { reactive } from 'vue'

export const useErrorLogStore = defineStore('error-log', () => {
    const errorLogInfoList = reactive<ErrorLogInfoWithAdditionalData[]>([])

    const addErrorLogInfo = (data: ErrorLogInfo) => {
        errorLogInfoList.push({
            ...data,
            date: formatToDateTime(new Date()),
            url: window.location.href,
        })
    }

    return {
        addErrorLogInfo
    }
})

export function useErrorLogStoreWithOut() {
    return useErrorLogStore(store)
}
