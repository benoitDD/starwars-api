import resolversPersons from './persons'
import resolversPlanets from './planets'
import resolversSpecies from './species'
import resolversStarships from './starships'
import resolversVehicles from './vehicles'
import resolversSearch from './search'

function createResolvers(...args){
    var resolvers = {}
    args.forEach(resolver => {
        if(resolver.Query){
            resolvers.Query = {...resolvers.Query, ...resolver.Query}
        }
        if(resolver.Type){
            resolvers = {...resolvers, ...resolver.Type}
        }
    })
    return resolvers
}

const resolvers = createResolvers(resolversPersons, resolversPlanets, resolversSpecies,
    resolversStarships, resolversVehicles, resolversSearch)

export default resolvers