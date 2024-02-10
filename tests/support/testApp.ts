import { test } from 'vitest'
import { bootstrap } from '@/main'

export const testApp = test.extend({
    app: await bootstrap(true),
})
