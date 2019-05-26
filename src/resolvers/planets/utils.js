import {getPageInfo} from '../utils'
/*
Les champs hasPreviousPage et hasNextPage du service swapi bug.
Donc on liste la 1er et dernière personnes pour corriger ce bug
*/
const cursorFirstPlanet = 'YXJyYXljb25uZWN0aW9uOjA='
const cursorLastPlanet = 'YXJyYXljb25uZWN0aW9uOjYw'

export function allPlanetsSWAPIToMe(dataName='planets'){
    return allPlanetsSWAPI => {
        return {
            pageInfo: getPageInfo(allPlanetsSWAPI, cursorFirstPlanet, cursorLastPlanet),
            planets: allPlanetsSWAPI[dataName]
        }
    }
}