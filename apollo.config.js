/* eslint-disable no-undef */
module.exports = {
    client: {
        includes: ['./src/swapi/query/*'],
        service: {
            name: 'swapi',
            localSchemaFile: './swapi.json'
        }
    }
}