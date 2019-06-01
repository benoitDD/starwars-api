import {mongoose} from './connect'
const {Schema} = mongoose

const MODEL = 'objects'

let ImageSchema = new Schema({
    filename: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    description: String
})

let ObjetSchema = new Schema({
    idExternal: {type: String, required: true, unique: true},
    type: {type: String, enum: ['Person', 'Planet', 'Specie', 'Starship', 'Vehicle'], required: true},
    imagesHeader: [ImageSchema]
},  {collection: MODEL})

ObjetSchema.statics.findByIdExternal = function(idExternal){
    return this.model(MODEL).findOne({idExternal})
}

let ObjetModel = mongoose.model(MODEL, ObjetSchema)

function returnObject(object){
    return object ? object.toObject() : object
}

function findObjectByIdExternal(idExternal){
    return ObjetModel.findByIdExternal(idExternal).then(returnObject)
}

function addObject(object){
    return ObjetModel.create(object).then(returnObject)
}

function getOrCreateObject(idExternal, type){
    return ObjetModel.findByIdExternal(idExternal)
        .then(object => {
            if(!object){
                return addObject({idExternal, type})
            }
            return object
        })
}

function removeImage(idExternal, idImage){
    return ObjetModel.findByIdExternal(idExternal)
        .then(object => {
            if(!object){
                return
            }
            object.imagesHeader.id(idImage).remove()
            return object.save()
        })
        .then(returnObject)
}

function addImage(idExternal, image){
    return ObjetModel.findByIdExternal(idExternal)
        .then(object => {
            object.imagesHeader.push(image)
            return object.save()
        })
        .then(returnObject)
}

export {findObjectByIdExternal, addObject, getOrCreateObject, removeImage, addImage}