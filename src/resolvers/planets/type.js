import {allPersonsSWAPIToMe} from '../persons/utils'

const Type = {
    Planet: {
        persons: (planet, {pageSize = 10, after, before}, { dataSources }) => {
            return dataSources.swapi.getAllPersonsOfPlanet(planet.id, pageSize, after, before)
                .then(allPersonsSWAPIToMe('residents'))
        }
    }
}

export default Type