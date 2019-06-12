import Mutation from '../../sign/mutation'
import {dataSources} from '../../../dataSources'
import {i18n} from '../../../test'

jest.mock('../../../database/starwars/modelUser.js')

describe('Test sing up', () => {
    const signUp = Mutation.signUp
    test('User don\'t exist', () => {
        return expect(signUp(undefined, {login: 'unknow', password: 'exact'},
            {dataSources, i18n})
        ).resolves
            .toEqual({
                success: true,
                user: {
                    login: 'unknow',
                    password: 'exact'
                }
            })
    })
    test('User exist', () => {
        return expect(signUp(undefined, {login: 'exist', password: 'exact'},
            {dataSources, i18n})
        ).resolves
            .toEqual({
                success: false,
                message: 'login.exist'
            })
    })
})