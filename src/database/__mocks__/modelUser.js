function findByLogin(login){
    return Promise.resolve(login !== 'unknow' ? {login, password: 'password'} : undefined)
}

function addUser(user){
    return Promise.resolve(user)
}

export {findByLogin, addUser}