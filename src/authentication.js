import jwt from 'jsonwebtoken'
import {ApolloError} from 'apollo-server-express'

const privateKeyToken = process.env.PRIVATE_KEY_TOKEN || 'shhhhhhh'

export function signIn(login){
    return jwt.sign({login}, privateKeyToken, { expiresIn: '1d' })
}

export function getSession(headers){
    const authorization = headers.authorization
    var token = null
    if(authorization && authorization.length){
        const splitAuth = authorization.split(' ')
        const typeAuth = splitAuth[0]
        if(typeAuth !== 'Bearer'){
            throw new ApolloError(`Authorization of type ${typeAuth} isn't allow`)
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
                    reject(new ApolloError('token expired', 'TOKEN_EXPIRED'))
                }else if(err.name === 'JsonWebTokenError'){
                    reject(new ApolloError('token invalid', 'TOKEN_INVALID'))
                }else {
                    reject(err)
                }
            }else{
                resolve(decoded)
            }
        })
    })
}