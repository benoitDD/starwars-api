import {ResponseAPI, stringEmpty, handleError, ErrorAPIHandle, resolversPrivate} from '../utils'
import {uploadImage, errorIfObjectSWAPINotExist, 
    returnObjectFull, removeImageOnDisk} from './utils'

const Mutation = {
    addImageHeader: (_, {inputAddImage}, {dataSources , i18n}) => {
        var response = new ResponseAPI()
        var image = inputAddImage.imageHeader
        if(stringEmpty(image.title)){
            response.addDetailsError('title', i18n.t('title.must.fill'))
        }
        if(!response.success){
            return response
        }
        return errorIfObjectSWAPINotExist(inputAddImage.idExternal, inputAddImage.type, dataSources, i18n)
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
            .catch(handleError(i18n))
    },
    removeImage : (_,{inputRemoveImage}, {dataSources, i18n}) => {
        return dataSources.database.objects.findObjectByIdExternal(inputRemoveImage.idExternal)
            .then(objectDB => {
                if(!objectDB){
                    throw new ErrorAPIHandle('object.id.unknow', {id: inputRemoveImage.idExternal})
                }
                const image = objectDB.imagesHeader && objectDB.imagesHeader.find(
                    image => image._id.toString() === inputRemoveImage.idImage
                )
                if(!image){
                    throw new ErrorAPIHandle('object.id.not.image.id', {idObject: inputRemoveImage.idExternal, idImage: inputRemoveImage.idImage})
                }
                return removeImageOnDisk(image.filename)
            }).then(() => {
                return dataSources.database.objects.removeImage(inputRemoveImage.idExternal, inputRemoveImage.idImage)
            })
            .then(objectDB => {
                if(!objectDB){
                    throw new ErrorAPIHandle('object.id.unknow', {id: inputRemoveImage.idExternal})
                }
                return Promise.all([
                    objectDB,
                    errorIfObjectSWAPINotExist(inputRemoveImage.idExternal, objectDB.type, dataSources)
                ])
            }).then(returnObjectFull)
            .catch(handleError(i18n))
    }
}

export default resolversPrivate(Mutation)