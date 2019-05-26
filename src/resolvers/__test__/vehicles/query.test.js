import Query from '../../vehicles/query'
import {dataSources} from '../../../dataSources'
import {mockOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination} from '../../../test'

describe('Test query allVehicles', () => {
    const allVehicles = Query.allVehicles
    const vehicles = 'toto1 toto 2'
    test('Get 10 vehicles', () => {
        mockOnceQuery('allVehicles', valueGetAllObjectSWAPI('vehicles', vehicles))
        return expect(allVehicles(null, {pageSize: 10}, {dataSources}))
            .resolves
            .toEqual({
                ...valuePagination,
                vehicles
            })
    })
})

describe('Test query vehicle', () => {
    const vehicle = Query.vehicle
    test('Get a vehicle of id: id-1', () => {
        const response = 'toto1'
        mockOnceQuery('vehicle', response)
        return expect(vehicle(null, {id: 'id-1'}, {dataSources}))
            .resolves
            .toEqual(response)
    })
    test('Throw error', () => {
        const error = Error('une erreur')
        mockThrowOnceQuery(error)
        return expect(vehicle(54, {id: 'id-1'}, {dataSources}))
            .rejects
            .toBe(error)
    })
})