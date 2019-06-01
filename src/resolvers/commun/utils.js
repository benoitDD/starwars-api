import mime from 'mime-types'
import uniqueSlug from 'unique-slug'
import fs from 'fs'
import {ErrorAPI, ResponseMutation} from '../utils'

const extensionAccept = ['png', 'jpeg', 'jpg']

export function createDirectoryIfNotExist(path){
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err && err.code !== 'EEXIST') reject(err)
            resolve()
        })
    })
}

export function uploadImage({ createReadStream, mimetype }){
    const extension = mime.extension(mimetype)
    if(!extensionAccept.includes(extension)){
        throw Error(`The files extension ${extension} don't allow`)
    }
    const filenameImg = uniqueSlug() + '.' + extension
    const stream = createReadStream()
    const pathImages = process.env.DIRECTORY_IMAGE
    createDirectoryIfNotExist(pathImages)
        
    var wstream = fs.createWriteStream(`${pathImages}/${filenameImg}`)
    stream.pipe(wstream)
    return filenameImg
}

const TYPE_PERSON = 'Person'
const TYPE_PLANET = 'Planet'
const TYPE_SPECIES = 'Specie'
const TYPE_STARSHIP = 'Starship'
const TYPE_VEHICLE = 'Vehicle'

export function loadObjectSWAPI(id, type, dataSources){
    switch(type){
    case TYPE_PERSON:
        return dataSources.swapi.getPerson(id)
    case TYPE_PLANET:
        return dataSources.swapi.getPlanet(id)
    case TYPE_SPECIES:
        return dataSources.swapi.getSpecie(id)
    case TYPE_STARSHIP:
        return dataSources.swapi.getStarship(id)
    case TYPE_VEHICLE:
        return dataSources.swapi.getVehicle(id)
    default:
        throw Error(`The type ${type} don't handle`)
    }
}

export function errorIfObjectSWAPINotExist(id, type, dataSources){
    return loadObjectSWAPI(id, type, dataSources)
        .then(objectSWAPI => {
            if(!objectSWAPI){
                throw new ErrorAPI(`L'objet de type ${type} et d'identifiant ${id} n'existe pas`)
            }
            return objectSWAPI
        })
}

export function gatherObjectSWAPIAndDB(objectSwapi, objectDB){
    objectSwapi.more = objectDB
    return objectSwapi
}

export function returnObjectFull([objectDB, objectSwapi]){
    const objectFull = gatherObjectSWAPIAndDB(objectSwapi, objectDB)
    objectFull.__typename = objectDB.type
    let response = new ResponseMutation()
    response.setObject(objectFull)
    return response
}

export function removeImageOnDisk(filename){
    const path = `${process.env.DIRECTORY_IMAGE}/${filename}`
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) reject(new ErrorAPI(err.message))
            resolve()
        })
    })
}