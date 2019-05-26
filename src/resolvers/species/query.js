import {allSpeciesSWAPIToMe} from './utils'

const Query = {
    allSpecies: (_,{pageSize = 10, after, before}, {dataSources}) => {
        return dataSources.swapi.getAllSpecies(pageSize, after, before)
            .then(allSpeciesSWAPIToMe())
    },
    specie: (_,{id}, {dataSources}) => {
        return dataSources.swapi.getSpecie(id)
    }
}

export default Query