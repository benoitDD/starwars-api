import jwt from 'jsonwebtoken'
import {ApolloError} from 'apollo-server-express'
import {tokenInBlacklist} from './database/redis'

const privateKeyToken = process.env.PRIVATE_KEY_TOKEN || 'shhhhhhh'

export function signIn(login){
    return jwt.sign({login}, privateKeyToken, { expiresIn: '1d' })
}

export function getSession(headers, i18n){
    const authorization = headers.authorization
    var token = null
    if(authorization && authorization.length){
        const splitAuth = authorization.split(' ')
        const typeAuth = splitAuth[0]
        if(typeAuth !== 'Bearer'){
            throw new ApolloError(i18n.t('auth.type.not.allow', {type: typeAuth}))
        }
        token = splitAuth[1]
    }
    return new Promise((resolve, reject) => {
        if(!token){
            return resolve()
        }
        jwt.verify(token, privateKeyToken, function(err, decoded) {
            if(err){
                if(err.name === 'TokenExpiredError'){
                    reject(new ApolloError(i18n.t('token.expired'), 'TOKEN_EXPIRED'))
                }else if(err.name === 'JsonWebTokenError'){
                    reject(new ApolloError(i18n.t('token.invalid'), 'TOKEN_INVALID'))
                }else {
                    reject(err)
                }
            }else{
                tokenInBlacklist(token)
                    .then(isBlackListed => {
                        if(isBlackListed){
                            return reject(new ApolloError(i18n.t('token.blacklisted'), 'TOKEN_BLACKLISTED'))
                        }
                        resolve({...decoded, token})
                    })
            }
        })
    })
}