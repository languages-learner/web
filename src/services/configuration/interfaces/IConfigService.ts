import type { IConfig } from '@/services/configuration/interfaces/IConfig'

export interface IConfigService {
    setup(): Promise<void>
    getConfig(): IConfig
    getBaseConfig(): IConfig
}
