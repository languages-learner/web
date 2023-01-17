import firebase from 'firebase/app'
import 'firebase/remote-config'
import { IConfig } from '@/services/configuration/common/IConfig'
import { IConfigService } from '@/services/configuration/common/IConfigService'
import RemoteConfig = firebase.remoteConfig.RemoteConfig;

export class Config implements IConfigService {
    private static instance: Config

    public static getInstance(): IConfigService {
        if (!Config.instance) {
            Config.instance = new Config()
        }

        return Config.instance
    }

    private _config: RemoteConfig

    constructor() {
        this._config = firebase.remoteConfig()

        /*
        * Disable cache for development mode
        * */
        if (import.meta.env.DEV) {
            firebase.remoteConfig().settings.fetchTimeoutMillis = 0
            firebase.remoteConfig().settings.minimumFetchIntervalMillis = 0
        }
    }

    private async fetchConfig() {
        await this._config.fetchAndActivate()
    }

    public async setup(): Promise<void> {
        await this.fetchConfig()
    }

    public getConfig() {
        return Object.entries(firebase.remoteConfig().getAll()).reduce((answer, [key, value]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            answer[key] = JSON.parse(value.asString())

            return answer
        }, {} as IConfig)
    }

    public getBaseConfig() {
        return {
            languages: [],
            languagesAvailableForLearning: [],
            interfaceLanguages: []
        } as IConfig
    }
}
