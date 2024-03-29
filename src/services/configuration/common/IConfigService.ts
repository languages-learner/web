import type { IConfig } from '@/services/configuration/common/IConfig'

export interface IConfigService {
    setup(): Promise<void>
    getConfig(): IConfig
    getBaseConfig(): IConfig
}
