import {allStarshipsSWAPIToMe} from '../starships/utils'
import {allVehiclesSWAPIToMe} from '../vehicles/utils'

const Type = {
    Person: {
        homeworld: (person, _, { dataSources }) => {
            return dataSources.swapi.getPlanetOfPerson(person.id)
        },
        specie: (person, _, { dataSources }) => {
            return dataSources.swapi.getSpecieOfPerson(person.id)
        },
        starships: (person, {pageSize = 10, after, before}, { dataSources }) => {
            return dataSources.swapi.getAllStarshipsOfPerson(person.id, pageSize, after, before)
                .then(allStarshipsSWAPIToMe())
        },
        vehicles: (person, {pageSize = 10, after, before}, { dataSources }) => {
            return dataSources.swapi.getAllVehiclesOfPerson(person.id, pageSize, after, before)
                .then(allVehiclesSWAPIToMe())
        },
        more: (person, _, {dataSources}) => {
            return dataSources.database.objects.findObjectByIdExternal(person.id)
        }
    }
}

export default Type