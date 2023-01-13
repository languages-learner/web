import { StoreDefinition, defineStore } from 'pinia'
import { store } from '@/store'
import ErrorLogInfo from '@/models/ErrorLogInfo'
import { formatToDateTime } from '@/utils/dateUtil'

export interface State {
    errorLogInfoList: ErrorLogInfo[]
}

type ErrorLogStore = StoreDefinition<string,
    State,
    // eslint-disable-next-line @typescript-eslint/ban-types
    {}, {
    addErrorLogInfo: (data: ErrorLogInfo) => void
}>

export const useErrorLogStore: ErrorLogStore = defineStore('error-log', {
    state: () => ({
        errorLogInfoList: [],
    } as State),
    actions: {
        addErrorLogInfo(data: ErrorLogInfo) {
            const item = {
                ...data,
                time: formatToDateTime(new Date()),
            }
            this.errorLogInfoList.push(item)
        },
    },
})

export function useErrorLogStoreWithOut() {
    return useErrorLogStore(store)
}
