import 'fake-indexeddb/auto'
import { config } from '@vue/test-utils'

config.global.mocks = {
    $t: (tKey: string) => tKey,
}
