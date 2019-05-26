import {getPageInfo} from '../utils'
/*
Les champs hasPreviousPage et hasNextPage du service swapi bug.
Donc on liste la 1er et dernière personnes pour corriger ce bug
*/
const cursorFirstStarship = 'YXJyYXljb25uZWN0aW9uOjA='
const cursorLastStarship = 'YXJyYXljb25uZWN0aW9uOjM2'

export function allStarshipsSWAPIToMe(dataName='starships'){
    return allStarshipsSWAPI => {
        return {
            pageInfo: getPageInfo(allStarshipsSWAPI, cursorFirstStarship, cursorLastStarship),
            starships: allStarshipsSWAPI[dataName]
        }
    }
}