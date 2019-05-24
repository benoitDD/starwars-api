import {getPageInfo} from '../utils'
/*
Les champs hasPreviousPage et hasNextPage du service swapi bug.
Donc on liste la 1er et dernière personnes pour corriger ce bug
*/
const cursorFirstPerson = 'YXJyYXljb25uZWN0aW9uOjA='
const cursorLastPerson = 'YXJyYXljb25uZWN0aW9uOjg2'

const Query = {
    allPersons: (_,{pageSize = 10, after, before}, {dataSources}) => {
        return dataSources.swapi.persons.getAllPeople(pageSize, after, before)
            .then(({data: {allPeople}}) => (
                {
                    pageInfo: getPageInfo(allPeople, cursorFirstPerson, cursorLastPerson),
                    persons: allPeople.people
                }
            ))
    },
    person: (_,{id}, {dataSources}) => {
        return dataSources.swapi.persons.getPerson(id)
            .then(({data: {person}}) => (person))
    }
}

export default Query