import {mongoose} from './connect'
const {Schema} = mongoose

const MODEL = 'users'

let UserSchema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},  {collection: MODEL})

UserSchema.statics.findByLogin = function(login){
    return this.model(MODEL).findOne({login})
}

let UserModel = mongoose.model(MODEL, UserSchema)

function returnUser(object){
    return object ? object.toObject() : object
}

function findByLogin(login){
    return UserModel.findByLogin(login).then(returnUser)
}

function addUser(user){
    return UserModel.create(user).then(returnUser)
}

export {findByLogin, addUser}