import Query from '../../persons/query'
import {dataSourcesMock as dataSources, responseGetAllPerson, responseGetPerson} from '../../../test'

describe('Test query allPersons', () => {
    const allPersons = Query.allPersons
    test('Get 10 persons', () => {
        return expect(allPersons(null, {pageSize: 10}, {dataSources}))
            .resolves
            .toEqual({
                pageInfo: {
                    startCursor: responseGetAllPerson.pageInfo.startCursor,
                    endCursor: responseGetAllPerson.pageInfo.endCursor,
                    totalCount: responseGetAllPerson.totalCount,
                    hasPreviousPage: true,
                    hasNextPage: true,
                },
                persons: responseGetAllPerson.people
            })
    })
})

describe('Test query person', () => {
    const person = Query.person
    test('Get a person of id: id-1', () => {
        return expect(person(54, {id: 'id-1'}, {dataSources}))
            .resolves
            .toEqual(responseGetPerson)
    })
    test('Throw error', () => {
        const error = Error('une erreur')
        dataSources.swapi.persons.getPerson.mockImplementation(() => (Promise.reject(error)))
        return expect(person(54, {id: 'id-1'}, {dataSources}))
            .rejects
            .toBe(error)
    })
})