import type { RouteRecordRaw } from 'vue-router'
import { EPageName } from '@/enums/EPageName'

const Dictionary = () => import('@/modules/workspace/modules/words/pages/Dictionary/DictionaryPage.vue')

export const wordsRoutes: RouteRecordRaw[] = [{
    name: EPageName.DICTIONARY,
    path: 'dictionary',
    component: Dictionary,
}]
