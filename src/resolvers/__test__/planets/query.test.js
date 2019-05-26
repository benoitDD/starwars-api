import Query from '../../planets/query'
import {dataSources} from '../../../dataSources'
import {mockOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination} from '../../../test'

describe('Test query allPlanets', () => {
    const allPlanets = Query.allPlanets
    const planets = 'toto1 toto 2'
    test('Get 10 planets', () => {
        mockOnceQuery('allPlanets', valueGetAllObjectSWAPI('planets', planets))
        return expect(allPlanets(null, {pageSize: 10}, {dataSources}))
            .resolves
            .toEqual({
                ...valuePagination,
                planets
            })
    })
})

describe('Test query planet', () => {
    const planet = Query.planet
    test('Get a planet of id: id-1', () => {
        const response = 'toto1'
        mockOnceQuery('planet', response)
        return expect(planet(null, {id: 'id-1'}, {dataSources}))
            .resolves
            .toEqual(response)
    })
    test('Throw error', () => {
        const error = Error('une erreur')
        mockThrowOnceQuery(error)
        return expect(planet(54, {id: 'id-1'}, {dataSources}))
            .rejects
            .toBe(error)
    })
})