import Query from '../../starships/query'
import {dataSources} from '../../../dataSources'
import {mockOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination} from '../../../test'

describe('Test query allStarships', () => {
    const allStarships = Query.allStarships
    const starships = 'toto1 toto 2'
    test('Get 10 starships', () => {
        mockOnceQuery('allStarships', valueGetAllObjectSWAPI('starships', starships))
        return expect(allStarships(null, {pageSize: 10}, {dataSources}))
            .resolves
            .toEqual({
                ...valuePagination,
                starships
            })
    })
})

describe('Test query starship', () => {
    const starship = Query.starship
    test('Get a starship of id: id-1', () => {
        const response = 'toto1'
        mockOnceQuery('starship', response)
        return expect(starship(null, {id: 'id-1'}, {dataSources}))
            .resolves
            .toEqual(response)
    })
    test('Throw error', () => {
        const error = Error('une erreur')
        mockThrowOnceQuery(error)
        return expect(starship(54, {id: 'id-1'}, {dataSources}))
            .rejects
            .toBe(error)
    })
})