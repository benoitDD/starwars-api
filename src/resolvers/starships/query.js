import {allStarshipsSWAPIToMe} from './utils'

const Query = {
    allStarships: (_,{pageSize = 10, after, before}, {dataSources}) => {
        return dataSources.swapi.getAllStarships(pageSize, after, before)
            .then(allStarshipsSWAPIToMe())
    },
    starship: (_,{id}, {dataSources}) => {
        return dataSources.swapi.getStarship(id)
    }
}

export default Query