import Mutation from '../../sign/mutation'
import {dataSources} from '../../../dataSources'

jest.mock('../../../database/modelUser.js')

describe('Test sing up', () => {
    const signUp = Mutation.signUp
    test('User don\'t exist', () => {
        return expect(signUp(undefined, {login: 'unknow', password: 'exact'},
            {dataSources})
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
            {dataSources})
        ).resolves
            .toEqual({
                success: false,
                message: 'Login exist!'
            })
    })
})