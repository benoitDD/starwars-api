import {connectDatabase as connectDatabaseStarwars} from './starwars'

export function connectDatabase(){
    return Promise.all([connectDatabaseStarwars()])
}