import mongoose from 'mongoose'

function connectDatabase(){ 
    return mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/starwars?retryWrites=true`, 
        {
            useNewUrlParser: true,
            autoIndex: false,
            autoCreate:false
        }
    )
}

export {mongoose, connectDatabase}