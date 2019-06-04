function compare(password){
    return Promise.resolve(password !== 'unknow')
}

function hash(password){
    return Promise.resolve(password)
}

export default {compare, hash}