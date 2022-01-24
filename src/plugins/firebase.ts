import firebase from 'firebase'
import config from '@@/firebase.config.json'

export const setupFirebaseApp = (): Promise<void> => {
    firebase.initializeApp(config)

    return isFirebaseAppReady()
}

const isFirebaseAppReady = async (): Promise<void> => {
    return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(() => {
            resolve()
        })
    })
}
