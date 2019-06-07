import i18n from 'i18next'
import Backend from 'i18next-node-fs-backend'
import {LanguageDetector} from 'i18next-express-middleware'

i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',//Use 'en' if language is not available
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        preload: ['en', 'fr'],
        backend: {
            loadPath: `${__dirname}/../${process.env.DIRECTORY_LOCALES_I18N}`,
        }
    })

export default i18n