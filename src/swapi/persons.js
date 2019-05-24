import {GraphQLDataSource} from 'apollo-datasource-graphql'
import {AllPeople, Person} from './query/persons.gql'
import {buildVariablesForPagination} from './utils'

class PersonsService extends GraphQLDataSource {
    constructor(){
        super()
        this.baseURL = process.env.SWAPI_URL
    }

    getAllPeople(pageSize = 10, after, before){
        var variables = buildVariablesForPagination(pageSize, after, before)
        return this.query(AllPeople, {variables})
    }

    getPerson(id){
        return this.query(Person, {
            variables: {id}
        })
    }
}

export const personsService = new PersonsService()