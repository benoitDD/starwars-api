import express from 'express'
import * as log from 'loglevel'
import {ApolloServer} from 'apollo-server-express'
import {dataSources} from './dataSources'
import typeDefs from './schema/index.gql'
import resolvers from  './resolvers'
import cors from 'cors'
import {connectDatabase} from './database'
import i18n from './i18n'
import i18nextMiddleware from 'i18next-express-middleware'
import {FormatErrorWithContextExtension} from 'graphql-format-error-context-extension'
import {formatError, context, corsOptions} from './utils'

log.setLevel('INFO')

const server = new ApolloServer({
    debug: process.env.NODE_ENV === 'development',
    typeDefs,
    resolvers,
    dataSources: () => (dataSources),
    context,
    extensions: [() => new FormatErrorWithContextExtension(formatError)]
})

const app = express()

app.use(process.env.PATH_IMAGES, express.static(`${__dirname}/../${process.env.DIRECTORY_IMAGE}`))

app.use(cors(corsOptions))

app.use(i18nextMiddleware.handle(i18n))

server.applyMiddleware({app})

app.get('/', (req, res) => {
    res.send('Go to /graphql')
})

const PORT = process.env.PORT || 9090

app.listen(PORT, () => {
    connectDatabase()
        .then(() => (
            log.info(`API start in mode ${process.env.NODE_ENV} on port ${PORT}`)
        ))
        .catch(err => (
            log.error(`Error while connection to the database: ${err.message}`)
        ))
})