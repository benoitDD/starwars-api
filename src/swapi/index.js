import {GraphQLDataSource} from 'apollo-datasource-graphql'
import {AllPeople, Person} from './query/persons.gql'
import {AllPlanets, Planet} from './query/planets.gql'
import {AllSpecies, Specie} from './query/species.gql'
import {AllStarships, Starship} from './query/starships.gql'
import {AllVehicles, Vehicle} from './query/vehicles.gql'
import {PlanetOfPerson, SpecieOfPerson, AllStarshipsOfPerson, AllVehiclesOfPerson,
    AllPersonsOfPlanet, AllPersonsOfSpecie, PlanetOfSpecie,
    AllPersonsOfStarship, AllPersonsOfVehicle} from './query/joint.gql'
import {buildVariablesForPagination} from './utils'

class SWAPIService extends GraphQLDataSource {
    constructor(){
        super()
        this.baseURL = process.env.SWAPI_URL
    }

    queryResponseFormat(dataName, query, options){
        return this.query(query, options)
            .then(response => (response.data[dataName]))
    }

    getAllObjets(dataName, query, pageSize = 10, after, before){
        var variables = buildVariablesForPagination(pageSize, after, before)
        return this.queryResponseFormat(dataName, query, {variables})
    }

    getAllObjetsOfObject(dataName, query, id, pageSize = 10, after, before){
        var variables = buildVariablesForPagination(pageSize, after, before)
        variables.id = id
        return this.queryResponseFormat(dataName, query, {variables})
    }

    getAllPeople(pageSize, after, before){
        return this.getAllObjets('allPeople', AllPeople, pageSize, after, before)
    }

    getPerson(id){
        return this.queryResponseFormat('person', Person, {
            variables: {id}
        })
    }

    getPlanetOfPerson(id){
        return this.queryResponseFormat('person', PlanetOfPerson, {
            variables: {id}
        })
            .then(person => (person ? person.homeworld : null))
    }

    getSpecieOfPerson(id){
        return this.queryResponseFormat('person', SpecieOfPerson, {
            variables: {id}
        })
            .then(person => (person ? person.species : null))
    }

    getAllStarshipsOfPerson(id, pageSize, after, before){
        return this.getAllObjetsOfObject('person', AllStarshipsOfPerson, id, pageSize, after, before)
            .then(person => (person ? person.starshipConnection : null))
    }

    getAllVehiclesOfPerson(id, pageSize, after, before){
        return this.getAllObjetsOfObject('person', AllVehiclesOfPerson, id, pageSize, after, before)
            .then(person => (person ? person.vehicleConnection : null))
    }

    getAllPlanets(pageSize, after, before){
        return this.getAllObjets('allPlanets', AllPlanets, pageSize, after, before)
    }

    getPlanet(id){
        return this.queryResponseFormat('planet', Planet, {
            variables: {id}
        })
    }

    getAllPersonsOfPlanet(id, pageSize, after, before){
        return this.getAllObjetsOfObject('planet', AllPersonsOfPlanet, id, pageSize, after, before)
            .then(planet => (planet ? planet.residentConnection : null))
    }

    getAllSpecies(pageSize, after, before){
        return this.getAllObjets('allSpecies',AllSpecies, pageSize, after, before)
    }

    getSpecie(id){
        return this.queryResponseFormat('species', Specie, {
            variables: {id}
        })
    }

    getAllPersonsOfSpecie(id, pageSize, after, before){
        return this.getAllObjetsOfObject('species', AllPersonsOfSpecie, id, pageSize, after, before)
            .then(species => (species ? species.personConnection : null))
    }

    getPlanetOfSpecie(id){
        return this.queryResponseFormat('species', PlanetOfSpecie, {
            variables: {id}
        })
            .then(species => (species ? species.homeworld : null))
    }

    getAllStarships(pageSize, after, before){
        return this.getAllObjets('allStarships', AllStarships, pageSize, after, before)
    }

    getStarship(id){
        return this.queryResponseFormat('starship', Starship, {
            variables: {id}
        })
    }

    getAllPersonsOfStarship(id, pageSize, after, before){
        return this.getAllObjetsOfObject('starship', AllPersonsOfStarship, id, pageSize, after, before)
            .then(starship => (starship ? starship.pilotConnection : null))
    }

    getAllVehicles(pageSize, after, before){
        return this.getAllObjets('allVehicles', AllVehicles, pageSize, after, before)
    }

    getVehicle(id){
        return this.queryResponseFormat('vehicle', Vehicle, {
            variables: {id}
        })
    }

    getAllPersonsOfVehicle(id, pageSize, after, before){
        return this.getAllObjetsOfObject('vehicle', AllPersonsOfVehicle, id, pageSize, after, before)
            .then(vehicle => (vehicle ? vehicle.pilotConnection : null))
    }
}

export const swapiService = new SWAPIService()