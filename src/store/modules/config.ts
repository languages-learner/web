import { defineStore } from 'pinia'
import { useConfigService } from '@/plugins/services'
import { useI18n } from 'vue-i18n'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { EErrorType } from '@/enums/EErrorType'


export const useConfigStore = defineStore('config', () => {
    const configService = useConfigService()
    const { t } = useI18n()
    const { addErrorLogInfo } = useErrorLogStore()

    const getConfig = () => {
        try {
            return configService.getConfig()
        } catch (e: any) {
            addErrorLogInfo({
                type: EErrorType.CONFIG_STORE,
                message: e.message
            })

            return configService.getBaseConfig()
        }
    }

    const config = getConfig()

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
