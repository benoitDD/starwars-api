import {allVehiclesSWAPIToMe} from './utils'

const Query = {
    allVehicles: (_,{pageSize = 10, after, before}, {dataSources}) => {
        return dataSources.swapi.getAllVehicles(pageSize, after, before)
            .then(allVehiclesSWAPIToMe())
    },
    vehicle: (_,{id}, {dataSources}) => {
        return dataSources.swapi.getVehicle(id)
    }
}

export default Query