import firebase from 'firebase';
import config from '@@/firebase.config.json'

export const initializeFirebaseApp = (): firebase.app.App => firebase.initializeApp(config)
