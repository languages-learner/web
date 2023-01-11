import { defineStore } from 'pinia'
import { useConfigService } from '@/plugins/services'


export const useConfigStore = defineStore('config', () => {
    const configService = useConfigService()

    return configService.getConfig()
})
