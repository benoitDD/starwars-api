import Query from '../../sign/query'
import {dataSources} from '../../../dataSources'

jest.mock('../../../database/modelUser.js')

describe('Test sign in', () => {
    const token = 'a_token'
    const signInAuth = jest.fn(() => token)
    const signIn = Query.signIn
    test('User exist', () => {
        return expect(signIn(undefined, {login: 'somebody', password: 'exact'},
            {dataSources, signIn: signInAuth})
        ).resolves
            .toEqual({
                success: true,
                token,
                user: {
                    login: 'somebody',
                    password: 'password'
                }
            })
    })
    test('Login don\'t exist', () => {
        return expect(signIn(undefined, {login: 'unknow', password: 'exact'},
            {dataSources, signIn: signInAuth})
        ).resolves
            .toEqual({
                success: false,
                message: 'Login or password is incorrect'
            })
    })
    test('Wrong password ', () => {
        return expect(signIn(undefined, {login: 'somebody', password: 'unknow'},
            {dataSources, signIn: signInAuth})
        ).resolves
            .toEqual({
                success: false,
                message: 'Login or password is incorrect'
            })
    })
})

describe('Test reload sign in', () => {
    const reloadSignIn = Query.reloadSignIn
    const user = {login: 'toto'}
    test('User is sign in', () => {
        expect(reloadSignIn(null, null, {session: user}))
            .toEqual({success: true, user})
    })
    test('User isn\'t sign in', () => {
        expect(reloadSignIn(null, null, {}))
            .toEqual({success: false})
    })
})