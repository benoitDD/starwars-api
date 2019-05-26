import {allPersonsSWAPIToMe} from '../persons/utils'

const Type = {
    Starship: {
        persons: (starship, {pageSize = 10, after, before}, { dataSources }) => {
            return dataSources.swapi.getAllPersonsOfStarship(starship.id, pageSize, after, before)
                .then(allPersonsSWAPIToMe('pilots'))
        }
    }
}

export default Type