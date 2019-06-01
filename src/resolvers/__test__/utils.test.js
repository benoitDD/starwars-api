import {getPageInfo, stringEmpty, ResponseMutation} from '../utils'

describe('Test de l\'utilitaire getPageInfo', () => {
    const totalCount = 50
    const endCursor = 'id-10'
    const startCursor = 'id-5'
    let objets = {
        totalCount,
        pageInfo: {
            endCursor,
            startCursor
        }
    }
    test('Il reste une page suivante mais pas précedente', () => {
        expect(getPageInfo(objets, 'id-5', 'id-20')).toEqual({
            startCursor,
            endCursor,
            totalCount,
            hasPreviousPage: false,
            hasNextPage: true,
        })
    })
    test('Il reste une page précedente mais pas suivante', () => {
        expect(getPageInfo(objets, 'id-1', 'id-10')).toEqual({
            startCursor,
            endCursor,
            totalCount,
            hasPreviousPage: true,
            hasNextPage: false,
        })
    })
    test('Il reste une page précedente et suivante', () => {
        expect(getPageInfo(objets, 'id-1', 'id-20')).toEqual({
            startCursor,
            endCursor,
            totalCount,
            hasPreviousPage: true,
            hasNextPage: true,
        })
    })
})

describe('Test de l\'utilitaire stringEmpty', () => {
    test('Chaine vide', () => {
        expect(stringEmpty('')).toBeTruthy()
    })

    test('Chaine avec des espaces', () => {
        expect(stringEmpty(' ')).toBeTruthy()
    })

    test('Sans arguments', () => {
        expect(stringEmpty()).toBeTruthy()
    })

    test('Un arguement null', () => {
        expect(stringEmpty(null)).toBeTruthy()
    })

    test('Un chaine non-vide', () => {
        expect(stringEmpty('toto')).toBeFalsy()
    })
})

describe('Util ResponseMutation', () => {
    test('Util Response message', () => {
        const response = new ResponseMutation()
        expect(response).toEqual({
            success: true
        })

        response.setMessageError('name must be fill')
        expect(response).toEqual({
            success: false,
            message: 'name must be fill'
        })
    })

    test('Util Response details', () => {
        const response = new ResponseMutation()
        response.addDetailsError('name', 'name must be fill')
        response.addDetailsError('age', 'age must be a positive number')
        expect(response).toEqual({
            success: false,
            details: [{key: 'name', message: 'name must be fill'},
                {key: 'age', message: 'age must be a positive number'}]
        })
    })

    test('Util Response object', () => {
        const response = new ResponseMutation()
        response.setObject({name: 'toto'})
        expect(response).toEqual({
            success: true,
            object: {name: 'toto'}
        })
    })
})