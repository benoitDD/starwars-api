import {allPersonsSWAPIToMe} from '../persons/utils'

const Type = {
    Specie: {
        persons: (specie, {pageSize = 10, after, before}, { dataSources }) => {
            return dataSources.swapi.getAllPersonsOfSpecie(specie.id, pageSize, after, before)
                .then(allPersonsSWAPIToMe())
        },
        planet: (specie, _, { dataSources }) => {
            return dataSources.swapi.getPlanetOfSpecie(specie.id)
        }
    }
}

export default Type