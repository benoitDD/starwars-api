import {objectMore} from '../../../test'

function findObjectByIdExternal(idExternal){
    return Promise.resolve(idExternal ? objectMore : null)
}

function addObject(object){
    return Promise.resolve(object)
}

function getOrCreateObject(){
    return Promise.resolve(objectMore)
}

function removeImage(){
    return Promise.resolve(objectMore)
}

function addImage(){
    return Promise.resolve(objectMore)
}

export {findObjectByIdExternal, addObject, getOrCreateObject, removeImage, addImage}