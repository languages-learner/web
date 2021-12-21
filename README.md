# Vue 3 + Typescript + Vite

## Firebase deploy

1. `yarn add firebase-tools`
2. `yarn firebase login`
3. `firebase use --add`
4. `yarn firebase init`
5. `yarn build`
6. `yarn firebase deploy`

### Github actions

1. Create token
   1. `firebase login:ci`
2. Create github secrets
   1. `name: FIREBASE_TOKEN, value: ${token}`
   2. `name: FIREBASE_CONFIG, value: ${config | base64}`
