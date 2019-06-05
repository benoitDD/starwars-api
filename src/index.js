import express from 'express'
import * as log from 'loglevel'
import {ApolloServer} from 'apollo-server-express'
import {dataSources} from './dataSources'
import typeDefs from './schema/index.gql'
import resolvers from  './resolvers'
import cors from 'cors'
import {connectDatabase} from './database'
import {getSession, signIn} from './authentication.js'

log.setLevel('INFO')

const server = new ApolloServer({
    debug: process.env.NODE_ENV === 'development',
    typeDefs,
    resolvers,
    dataSources: () => (dataSources),
    context: ({req}) => {
        return getSession(req.headers)
            .then(session => {
                log.info(`Login:${session ? session.login: 'undefined!'}`)
                return {
                    session: session,
                    signIn
                }
            })
    },
})

const app = express()

app.use(process.env.PATH_IMAGES, express.static(`${__dirname}/../${process.env.DIRECTORY_IMAGE}`))

const whitelist = process.env.CORS_ORIGIN.split(',')

var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(null, whitelist[0])
        }
    },
    optionsSuccessStatus: 200,
    maxAge: 600
}
app.use(cors(corsOptions))

server.applyMiddleware({app})

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = process.env.PORT || 9090

app.listen(PORT, () => {
    connectDatabase()
        .then(() => (
            log.info(`API démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`)
        ))
        .catch(err => (
            log.error(`Error while connection to the database: ${err.message}`)
        ))
})