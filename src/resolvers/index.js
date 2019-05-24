import resolversPersons from './persons'

function createResolvers(...args){
    var resolvers = {}
    args.forEach(resolver => {
        if(resolver.Query){
            resolvers.Query = {...resolvers.Query, ...resolver.Query}
        }
    })
    return resolvers
}

const resolvers = createResolvers(resolversPersons)

export default resolvers