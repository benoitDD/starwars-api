import {getPageInfo} from '../utils'
/*
Les champs hasPreviousPage et hasNextPage du service swapi bug.
Donc on liste la 1er et dernière personnes pour corriger ce bug
*/
const cursorFirstVehicles = 'YXJyYXljb25uZWN0aW9uOjA='
const cursorLastVehicles = 'YXJyYXljb25uZWN0aW9uOjM4'

export function allVehiclesSWAPIToMe(dataName='vehicles'){
    return allVehiclesSWAPI => {
        return {
            pageInfo: getPageInfo(allVehiclesSWAPI, cursorFirstVehicles, cursorLastVehicles),
            vehicles: allVehiclesSWAPI[dataName]
        }
    }
}