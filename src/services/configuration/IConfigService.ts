import { IConfig } from '@/services/configuration/IConfig'

export interface IConfigService {
    setup(): Promise<void>
    getConfig(): IConfig
}
