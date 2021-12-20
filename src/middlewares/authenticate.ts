import { Router } from 'vue-router'
import firebase from 'firebase'

export const initializeAuthenticateMiddleware = (router: Router): void => {
    router.beforeEach((to, from, next) => {
        if (!to.meta.requiresAuth || to.meta.requiresAuth === false) return next()
        if (firebase.auth().currentUser) return next()
        if (to.name !== 'signin' && to.name !== 'signup') {
            return router.replace({
                name: 'signin'
            })
        }
    })
}
