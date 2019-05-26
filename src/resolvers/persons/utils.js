import {getPageInfo} from '../utils'
/*
Les champs hasPreviousPage et hasNextPage du service swapi bug.
Donc on liste la 1er et dernière personnes pour corriger ce bug
*/
const cursorFirstPerson = 'YXJyYXljb25uZWN0aW9uOjA='
const cursorLastPerson = 'YXJyYXljb25uZWN0aW9uOjg2'

export function allPersonsSWAPIToMe(dataName='people'){
    return allPersonsSWAPI => {
        return {
            pageInfo: getPageInfo(allPersonsSWAPI, cursorFirstPerson, cursorLastPerson),
            persons: allPersonsSWAPI[dataName]
        }
    }
}