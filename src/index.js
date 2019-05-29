import express from 'express'
import * as log from 'loglevel'
import {ApolloServer} from 'apollo-server-express'
import {dataSources} from './dataSources'
import typeDefs from './schema/index.gql'
import resolvers from  './resolvers'
import {formatError} from './utils'
import cors from 'cors'

log.setLevel('INFO')

const server = new ApolloServer({
    debug: process.env.NODE_ENV === 'development',
    typeDefs,
    resolvers,
    dataSources: () => (dataSources),
    formatError
})

const app = express()

var corsOptions = {
    origin: process.env.CORS_ORIGIN,
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
    log.info(`API démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`)
})