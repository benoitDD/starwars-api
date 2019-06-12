import {connectDatabase as connectDatabaseStarwars} from './starwars'
import {connectDatabase as connectDatabaseRedis} from './redis'

export function connectDatabase(){
    return Promise.all([connectDatabaseStarwars(), connectDatabaseRedis()])
}