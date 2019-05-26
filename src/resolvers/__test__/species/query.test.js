import Query from '../../species/query'
import {dataSources} from '../../../dataSources'
import {mockOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination} from '../../../test'

describe('Test query allSpecies', () => {
    const allSpecies = Query.allSpecies
    const species = 'toto1 toto 2'
    test('Get 10 species', () => {
        mockOnceQuery('allSpecies', valueGetAllObjectSWAPI('species', species))
        return expect(allSpecies(null, {pageSize: 10}, {dataSources}))
            .resolves
            .toEqual({
                ...valuePagination,
                species
            })
    })
})

describe('Test query specie', () => {
    const specie = Query.specie
    test('Get a specie of id: id-1', () => {
        const response = 'toto1'
        mockOnceQuery('species', response)
        return expect(specie(null, {id: 'id-1'}, {dataSources}))
            .resolves
            .toEqual(response)
    })
    test('Throw error', () => {
        const error = Error('une erreur')
        mockThrowOnceQuery(error)
        return expect(specie(54, {id: 'id-1'}, {dataSources}))
            .rejects
            .toBe(error)
    })
})