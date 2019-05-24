import express from 'express'
import * as log from 'loglevel'
import {ApolloServer} from 'apollo-server-express'
import swapi from './swapi'
import typeDefs from './schema/index.gql'
import resolvers from  './resolvers'
import {formatError} from './utils'

log.setLevel('INFO')

const server = new ApolloServer({
    debug: process.env.NODE_ENV === 'development',
    typeDefs,
    resolvers,
    dataSources: () => ({
        swapi,
    }),
    formatError
})

const app = express()

server.applyMiddleware({app})

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = process.env.PORT || 9090

app.listen(PORT, () => {
    log.info(`API démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`)
})