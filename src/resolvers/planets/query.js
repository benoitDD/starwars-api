import {allPlanetsSWAPIToMe} from './utils'

const Query = {
    allPlanets: (_,{pageSize = 10, after, before}, {dataSources}) => {
        return dataSources.swapi.getAllPlanets(pageSize, after, before)
            .then(allPlanetsSWAPIToMe())
    },
    planet: (_,{id}, {dataSources}) => {
        return dataSources.swapi.getPlanet(id)
    }
}

export default Query