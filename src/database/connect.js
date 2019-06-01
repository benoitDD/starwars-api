import mongoose from 'mongoose'

function connectDatabase(){ 
    return mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@starwars-qkig8.mongodb.net/starwars?retryWrites=true`, 
        {
            useNewUrlParser: true,
            autoIndex: false,
            autoCreate:false
        }
    )
}

export {mongoose, connectDatabase}