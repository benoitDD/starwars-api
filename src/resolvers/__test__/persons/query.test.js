import Query from '../../persons/query'
import {dataSources} from '../../../dataSources'
import {mockOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination} from '../../../test'

describe('Test query allPersons', () => {
    const allPersons = Query.allPersons
    const persons = 'toto1 toto 2'
    test('Get 10 persons', () => {
        mockOnceQuery('allPeople', valueGetAllObjectSWAPI('people', persons))
        return expect(allPersons(null, {pageSize: 10}, {dataSources}))
            .resolves
            .toEqual({
                ...valuePagination,
                persons
            })
    })
})

describe('Test query person', () => {
    const person = Query.person
    test('Get a person of id: id-1', () => {
        const response = 'toto1'
        mockOnceQuery('person', response)
        return expect(person(null, {id: 'id-1'}, {dataSources}))
            .resolves
            .toEqual(response)
    })
    test('Throw error', () => {
        const error = Error('une erreur')
        mockThrowOnceQuery(error)
        return expect(person(54, {id: 'id-1'}, {dataSources}))
            .rejects
            .toBe(error)
    })
})