import Type from '../../persons/type'
import {dataSources} from '../../../dataSources'
import {objectMore} from '../../../test'

jest.mock('../../../database/modelObject.js')

const more = Type.Person.more
test('Get person more', () => {
    return expect(more({id: '123'}, null, {dataSources}))
        .resolves
        .toBe(objectMore)
})

