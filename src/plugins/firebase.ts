import firebase from 'firebase';
import config from '@@/firebase.config.json'

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()

export const userCollection = db.collection('users')
