import {AuthenticationError} from 'apollo-server-express'


/*
Dans l'argument objets, il y a au minimum
{
    totalCount
    pageInfo: {
        endCursor
        startCursor
    }
}
*/
export function getPageInfo(objets, cursorFirstObjet, cursorLastObjet){
    return {
        startCursor: objets.pageInfo.startCursor,
        endCursor: objets.pageInfo.endCursor,
        totalCount: objets.totalCount,
        hasPreviousPage: objets.totalCount && objets.pageInfo.startCursor !== cursorFirstObjet,
        hasNextPage: objets.totalCount && objets.pageInfo.endCursor !== cursorLastObjet,
    }
}

export class ResponseMutation {
    constructor(){
        this.success = true
    }

    setMessageError(message){
        this.success = false
        this.message = message
    }

    addDetailsError(key, message){
        this.success = false
        if(!this.details){
            this.details = []
        }
        this.details.push({key, message})
    }

    setObject(object){
        this.object = object
    }
}

export function stringEmpty(s){
    return !s || !s.length || !s.trim().length
}

export class ErrorAPI extends Error {
    constructor(...args){
        super(args)
    }
}

export function handleError(err){
    if(err instanceof ErrorAPI){
        let response = new ResponseMutation()
        response.setMessageError(err.message)
        return response
    }
    throw err
}

export function resolverPrivate(resolver){
    return function(parent, args, context, info){
        if(!context || !context.session){
            throw new AuthenticationError('You must authenticate')
        }
        return resolver(parent, args, context, info)
    }
}

export function resolversPrivate(resolvers){
    var res = {}
    Object.keys(resolvers).map(key => {
        res[key] = resolverPrivate(resolvers[key])
    })
    return res
}