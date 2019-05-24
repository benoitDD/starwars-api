import {ApolloError} from 'apollo-server-express'
import {formatApolloErrors} from 'apollo-server-core'
import * as log from 'loglevel'

function createErrorForFormatError(message, code){
    return formatApolloErrors([new ApolloError(message, code)])[0]
}

export function formatError(error){
    if(process.env.NODE_ENV === 'development'){
        return error
    }
    log.error(error.message)
    return createErrorForFormatError('Une erreur serveur est survenue, réessayer plus tard :-)', 'INTERNAL_SERVER_ERROR')
}