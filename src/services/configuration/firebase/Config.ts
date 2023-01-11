import firebase from 'firebase/app'
import 'firebase/remote-config'
import { IConfig } from '@/services/configuration/IConfig'

export class Config implements IConfig {
    constructor() {
        firebase.remoteConfig().fetchAndActivate()
    }

    get languagesAvailableForLearning() {
        return JSON.parse(firebase.remoteConfig().getValue('languagesAvailableForLearning').asString())
    }
}
