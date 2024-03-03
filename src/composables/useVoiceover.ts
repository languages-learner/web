import { useSpeechSynthesis } from '@vueuse/core'
import { useNotification } from 'naive-ui'

export const useVoiceover = ({
    language,
}: {
    language?: string
} = {}) => {
    const { t } = useI18n()
    const notification = useNotification()
    const { activeLearningLanguage } = useLearningLanguage()

    const textToSpeak = ref('')
    const speech = useSpeechSynthesis(textToSpeak, {
        lang: language ?? unref(activeLearningLanguage).nameShort ?? BASE_INTERFACE_LANGUAGE_NAME,
        pitch: 1,
        rate: 1,
        volume: 1,
    })

    const speak = (text: string) => {
        textToSpeak.value = text

        if (!unref(speech.isSupported)) {
            notification.error({
                content: t('compatibility_error'),
                meta: t('your_browser_does_not_support_the_text_to_speech_feature'),
                duration: 1000,
                keepAliveOnHover: true,
            })

            return
        }

        speech.speak()
        textToSpeak.value = ''
    }

    return {
        speak,
    }
}
