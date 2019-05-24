import {buildVariablesForPagination} from '../utils'

describe('Test buildVariablesForPagination', () =>{
    const idObject = 'un_id'
    const page = 10
    test('10 objets après idObject: Page suivante', () => {
        expect(buildVariablesForPagination(page, idObject))
            .toEqual({
                after: idObject,
                first: page
            })
    })
    test('10 objets avant idObject: Page précedente', () => {
        expect(buildVariablesForPagination(page, null, idObject))
            .toEqual({
                before: idObject,
                last: page
            })
    })
    test('10 premiers objets', () => {
        expect(buildVariablesForPagination(page))
            .toEqual({
                first: page
            })
    })
})