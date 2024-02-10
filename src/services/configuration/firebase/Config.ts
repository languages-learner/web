import firebase from 'firebase/compat/app'
import 'firebase/compat/remote-config'
import RemoteConfig = firebase.remoteConfig.RemoteConfig;
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

    private _config: RemoteConfig | undefined

    constructor() {
        if (typeof window !== 'undefined') {
            this._config = firebase.remoteConfig()

            /*
                * Disable cache for development mode
                * */
            if (import.meta.env.DEV) {
                firebase.remoteConfig().settings.fetchTimeoutMillis = 0
                firebase.remoteConfig().settings.minimumFetchIntervalMillis = 0
            }
        }
    }

    private async fetchConfig() {
        await this._config?.fetchAndActivate?.()
    }

    public async setup(): Promise<void> {
        await this.fetchConfig()
    }

    public getConfig() {
        return Object.entries(firebase.remoteConfig().getAll()).reduce((answer, [key, value]) => {
            answer[key as keyof IConfig] = JSON.parse(value.asString())

            return answer
        }, {} as IConfig)
    }

    public getBaseConfig() {
        return {
            languages: {},
            languagesAvailableForLearning: [],
            interfaceLanguages: [],
        } satisfies IConfig
    }
}
