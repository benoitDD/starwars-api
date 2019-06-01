import {MongoClient} from 'mongodb'
import * as log from 'loglevel'

var logging = log.noConflict()
logging.setLevel('INFO')

var client = MongoClient(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@starwars-qkig8.mongodb.net?retryWrites=true`, { useNewUrlParser: true })

client.connect(function (err) {
    if (err) {
        return logging.error(`Error to connect to the database: ${err.messsage}`)
    }
    const db = client.db('starwars')
    //Drop collection
    Promise.all([
        db.collection('objects').drop().catch(() => {})
    ])
        .then(() => {
            return Promise.all([
            //Create Collection
                db.createCollection('objects', {
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
                }),
            ])
        })
        .then(() => {
        //Create Indexe
            return Promise.all([
                db.collection('objects').createIndexes( [
                    { key: {'idExternal': 1 }, unique: true},
                    { key: {'imagesHeader.filename': 1 }, unique: true, sparse:true}
                ])
            ])
        })
        .then(() => {
            logging.info('Database created')
            client.close()
        })
        .catch(err => {
            logging.error(`Error to create the database: ${err.messsage}`)
            client.close()
        })
})