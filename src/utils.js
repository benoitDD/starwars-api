import {getSession, signIn} from './authentication.js'

export function formatError(error, {i18n}){
    if(error.extensions && error.extensions.exception && error.extensions.exception.codeI18n
        && i18n){
        error.message = i18n.t(error.extensions.exception.codeI18n, error.extensions.exception.params)
    }
    return error
}

export function context({req}){
    const i18n = req.i18n
    return getSession(req.headers, i18n)
        .then(session => {
            return {
                session: session,
                signIn,
                i18n
            }
        })
}

const whitelist = process.env.CORS_ORIGIN.split(',')

export const  corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(null, whitelist[0])
        }
    },
    optionsSuccessStatus: 200,
    maxAge: 600
}