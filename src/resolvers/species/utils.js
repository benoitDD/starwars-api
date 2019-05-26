import {getPageInfo} from '../utils'
/*
Les champs hasPreviousPage et hasNextPage du service swapi bug.
Donc on liste la 1er et dernière personnes pour corriger ce bug
*/
const cursorFirstSpecie = 'YXJyYXljb25uZWN0aW9uOjA='
const cursorLastSpecie = 'YXJyYXljb25uZWN0aW9uOjM2'

export function allSpeciesSWAPIToMe(dataName='species'){
    return allSpeciesSWAPI => {
        return {
            pageInfo: getPageInfo(allSpeciesSWAPI, cursorFirstSpecie, cursorLastSpecie),
            species: allSpeciesSWAPI[dataName]
        }
    }
}