import { createI18n } from 'vue-i18n';

import enUS from '@/locales/en-US.json';
import ruRU from '@/locales/ru-RU.json';
import frFR from '@/locales/fr-FR.json';

type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'ru-RU' | 'fr-FR'>({
    locale: 'en-US',
    fallbackLocale: {
        default: ['en-US', 'fr-FR', 'ru-RU'],
    },
    messages: {
        'en-US': enUS,
        'ru-RU': ruRU,
        'fr-FR': frFR,
    },
});

export default i18n;
