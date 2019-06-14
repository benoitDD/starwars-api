import {series, parallel} from 'gulp'
import * as log from 'loglevel'
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'

let logging = log.noConflict()
logging.setLevel('INFO')

let client, db

function loadEnv(cb) {
    dotenv.config({ path: __dirname + '/.env' })
    cb()
}

function connectDatabase(cb) {
    client = MongoClient(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_URI}?retryWrites=true`,
        {useNewUrlParser: true})
    client.connect(function (err) {
        if (err) {
            return cb(err)
        }
        db = client.db('starwars')
        cb()
    })
}

function dropCollection(name){
    return db.collection(name).drop().catch(() => {})
}

function dropCollectionObjects(){
    return dropCollection('objects')
}

function dropCollectionUsers(){
    return dropCollection('users')
}

function createCollectionObjects(){
    return db.createCollection('objects', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['idExternal', 'type'],
                properties: {
                    idExternal: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    type: {
                        enum: ['Person', 'Planet', 'Specie', 'Starship', 'Vehicle'],
                        description: 'a enum and is required'
                    },
                    imagesHeader: {
                        bsonType: 'array',
                        items: {
                            bsonType: 'object',
                            required: ['filename', 'title'],
                            properties: {
                                filename: {
                                    bsonType: 'string',
                                    description: 'must be a string and is required'
                                },
                                title: {
                                    bsonType: 'string',
                                    description: 'must be a string and is required'
                                },
                                description: {
                                    bsonType: 'string',
                                    description: 'must be a string'
                                },
                            }
                        }
                    }
                }
            }
        }
    })
}

function createCollectionUsers(){
    return db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['login', 'password'],
                properties: {
                    login: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    password: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    }
                }
            }
        }
    })
}

function addIndexesObjects(){
    return db.collection('objects').createIndexes( [
        { key: {'idExternal': 1}, unique: true},
        { key: {'imagesHeader.filename': 1}, unique: true, sparse: true}
    ])
}

function addIndexesUsers(){
    return db.collection('users').createIndex({'login': 1}, {unique: true})
}

function closeConnection(cb){
    client.close()
    cb()
}

export default series(loadEnv, connectDatabase, 
    parallel(dropCollectionObjects, dropCollectionUsers),
    parallel(createCollectionObjects, createCollectionUsers),
    parallel(addIndexesObjects, addIndexesUsers),
    closeConnection
)