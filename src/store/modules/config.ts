import { defineStore } from 'pinia'


export const useConfigStore = defineStore('config', () => {
    const configService = useConfigService()
    const { t } = useI18n()
    const { addErrorLogInfo } = useErrorLogStore()

    const getConfig = () => {
        try {
            return configService.getConfig()
        } catch (e) {
            addErrorLogInfo({
                type: EErrorType.CONFIG_STORE,
                message: getErrorMessage(e),
            })

            return configService.getBaseConfig()
        }
    }

    const config = getConfig()

    const getLanguageName = (id: number) => {
        return config.languages[id]
    }

    const getLanguageId = (name: string) => {
        const language = Object.entries(config.languages).find(([, languageName]) => name === languageName)

        return language ? Number(language[0]) : -1
    }

    const getTranslatedLanguageName = (id: number, format: 'full' | 'short' = 'full') => {
        return format === 'full' ? t(`language.${getLanguageName(id)}`) : getLanguageName(id).toUpperCase()
    }

    return {
        ...config,
        getLanguageId,
        getLanguageName,
        getTranslatedLanguageName,
    }
})
