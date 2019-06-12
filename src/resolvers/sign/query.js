import bcrypt from 'bcrypt'
import {setTokenInBlacklist} from '../../database/redis'
import {resolverPrivate} from '../utils'

const Query = {
    signIn: (_, {login, password}, {dataSources, signIn, i18n}) => {
        return dataSources.database.users.findByLogin(login)
            .then(user => {
                if(!user){
                    return {
                        success: false,
                        message: i18n.t('login.or.password.invalid')
                    }
                }
                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if(!match){
                            return {
                                success: false,
                                message: i18n.t('login.or.password.invalid')
                            }
                        }
                        const token = signIn(login)
                        return {
                            success: true,
                            token,
                            user
                        }
                    })
            })
    },
    reloadSignIn: (_, __, {session}) => {
        return session ? {success: true, user: session} : {success: false}
    },
    signOut: resolverPrivate((_, __, {session: {token, exp}}) => {
        return setTokenInBlacklist(token, exp)
            .then(() => {
                return {
                    success: true
                }
            })
    })
}

export default Query