import express from 'express'
import * as log from 'loglevel'

log.setLevel('INFO')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = process.env.PORT || 9090

app.listen(PORT, () => {
    log.info(`API démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`)
})