import { defineStore } from 'pinia'
import { useConfigService } from '@/plugins/services'
import { useI18n } from 'vue-i18n'


export const useConfigStore = defineStore('config', () => {
    const configService = useConfigService()
    const { t } = useI18n()

    const config = configService.getConfig()

    const getLanguageName = (id: number) => {
        return config.languages[id]
    }

    const getLanguageId = (name: string) => {
        const language = Object.entries(config.languages).find(([languageId, languageName]) => name === languageName)

        return language ? Number(language[0]) : -1
    }

    const getTranslatedLanguageName = (id: number) => {
        return t(`language.${getLanguageName(id)}`)
    }

    return {
        ...config,
        getLanguageId,
        getLanguageName,
        getTranslatedLanguageName
    }
})
