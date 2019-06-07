import bcrypt from 'bcrypt'

const Mutation = {
    signUp: (_, {login, password}, {dataSources, i18n}) => {
        return dataSources.database.users.findByLogin(login)
            .then(user => {
                if(user){
                    return {
                        success: false,
                        message: i18n.t('login.exist')
                    }
                }
                return bcrypt.hash(password, 10)
                    .then(hashPassword => {
                        return dataSources.database.users.addUser({
                            login,
                            password: hashPassword
                        })
                    })
                    .then(user => ({success: true, user}))
            })
    }
}

export default Mutation