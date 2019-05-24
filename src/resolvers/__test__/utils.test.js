import {getPageInfo} from '../utils'

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