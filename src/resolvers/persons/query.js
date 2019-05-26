import {allPersonsSWAPIToMe} from './utils'

const Query = {
    allPersons: (_,{pageSize = 10, after, before}, {dataSources}) => {
        return dataSources.swapi.getAllPeople(pageSize, after, before)
            .then(allPersonsSWAPIToMe())
    },
    person: (_,{id}, {dataSources}) => {
        return dataSources.swapi.getPerson(id)
    }
}

export default Query