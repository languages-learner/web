import type { IConfig } from '@/services/configuration/common/IConfig'
import type { IConfigService } from '@/services/configuration/common/IConfigService'

export class Config implements IConfigService {
    private static instance: Config

    public static getInstance(): IConfigService {
        if (!Config.instance) {
            Config.instance = new Config()
        }

        return Config.instance
    }

    public async setup(): Promise<void> {}

    public getConfig(): IConfig {
        return {
            languages: {
                [BASE_INTERFACE_LANGUAGE]: BASE_INTERFACE_LANGUAGE_NAME,
            },
            languagesAvailableForLearning: [BASE_INTERFACE_LANGUAGE],
            interfaceLanguages: [BASE_INTERFACE_LANGUAGE],
        } satisfies IConfig
    }

    public getBaseConfig() {
        return {
            languages: {},
            languagesAvailableForLearning: [],
            interfaceLanguages: [],
        } satisfies IConfig
    }
}
