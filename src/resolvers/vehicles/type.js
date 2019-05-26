import {allPersonsSWAPIToMe} from '../persons/utils'

const Type = {
    Vehicle: {
        persons: (vehicle, {pageSize = 10, after, before}, { dataSources }) => {
            return dataSources.swapi.getAllPersonsOfVehicle(vehicle.id, pageSize, after, before)
                .then(allPersonsSWAPIToMe('pilots'))
        }
    }
}

export default Type