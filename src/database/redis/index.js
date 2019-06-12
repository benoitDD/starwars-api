import redis, {createClient} from 'redis'
import {promisifyAll} from 'bluebird'
import * as log from 'loglevel'

promisifyAll(redis)

var client

export function connectDatabase(){
    client = createClient(process.env.REDIS_URI)

    client.onAsync('error')
        .catch(log.error)

    return client.onAsync('connect')
}

export function tokenInBlacklist(token){
    if(!token){
        return Promise.resolve(false)
    }
    return client.getAsync(token)
}

export function setTokenInBlacklist(token, expireAt){
    if(!token){
        return Promise.resolve()
    }
    return client.setAsync(token, 'a')
        .then(() => {
            client.expireat(token, expireAt)
        })
}