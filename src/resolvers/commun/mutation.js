import {ResponseMutation, stringEmpty, handleError, ErrorAPI} from '../utils'
import {uploadImage, errorIfObjectSWAPINotExist, 
    returnObjectFull, removeImageOnDisk} from './utils'

const Mutation = {
    addImageHeader: (_, {inputAddImage}, {dataSources}) => {
        var response = new ResponseMutation()
        var image = inputAddImage.imageHeader
        if(stringEmpty(image.title)){
            response.addDetailsError('title', 'A title must be fill')
        }
        if(!response.success){
            return response
        }
        return errorIfObjectSWAPINotExist(inputAddImage.idExternal, inputAddImage.type, dataSources)
            .then(objectSWAPI => {
                return Promise.all([
                    image.file.then(uploadImage), 
                    dataSources.database.objects.getOrCreateObject(inputAddImage.idExternal, inputAddImage.type),
                    objectSWAPI
                ])
            })
            .then(([filename, objectDB, objectSWAPI]) => {
                const newImage = {
                    filename,
                    title: image.title,
                    description: image.description,
                }
                return Promise.all([
                    dataSources.database.objects.addImage(objectDB.idExternal, newImage),
                    objectSWAPI
                ])
            }).then(returnObjectFull)
            .catch(handleError)
    },
    removeImage : (_,{inputRemoveImage}, { dataSources }) => {
        return dataSources.database.objects.findObjectByIdExternal(inputRemoveImage.idExternal)
            .then(objectDB => {
                if(!objectDB){
                    throw new ErrorAPI(`L'objet d'identifiant ${inputRemoveImage.idExternal} n'existe pas`)
                }
                const image = objectDB.imagesHeader && objectDB.imagesHeader.find(
                    image => image._id.toString() === inputRemoveImage.idImage
                )
                if(!image){
                    throw new ErrorAPI(`L'objet d'identifiant ${inputRemoveImage.idExternal} n'a pas d'image d'indentifiant ${inputRemoveImage.idImage}`)
                }
                return removeImageOnDisk(image.filename)
            }).then(() => {
                return dataSources.database.objects.removeImage(inputRemoveImage.idExternal, inputRemoveImage.idImage)
            })
            .then(objectDB => {
                if(!objectDB){
                    throw new ErrorAPI(`L'objet d'identifiant ${inputRemoveImage.idExternal} n'existe pas`)
                }
                return Promise.all([
                    objectDB,
                    errorIfObjectSWAPINotExist(inputRemoveImage.idExternal, objectDB.type, dataSources)
                ])
            }).then(returnObjectFull)
            .catch(handleError)
    }
}

export default Mutation