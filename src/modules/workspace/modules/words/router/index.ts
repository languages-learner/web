import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

export const wordsRoutes: RouteRecordRaw[] = [{
    name: EPageName.DICTIONARY,
    path: 'dictionary',
    component: () => import('@/modules/workspace/modules/words/pages/Dictionary/DictionaryPage.vue'),
}]
