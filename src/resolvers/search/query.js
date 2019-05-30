function searchMatch(regex, object){
    return regex.test(object.name)
}

function search(objects, regex){
    return objects.filter(object => searchMatch(regex, object))
}

function addTypeName(objects, type){
    return objects.map(object => ({...object, __typename: type}))
}

const Query = {
    search: (_,{text}, {dataSources}) => {
        const regex = new RegExp(text, 'i')
        const MAX_OBJECTS = 100
        return Promise.all([
            dataSources.swapi.getAllPeople(MAX_OBJECTS),
            dataSources.swapi.getAllPlanets(MAX_OBJECTS),
            dataSources.swapi.getAllSpecies(MAX_OBJECTS),
            dataSources.swapi.getAllStarships(MAX_OBJECTS),
            dataSources.swapi.getAllVehicles(MAX_OBJECTS)
        ])
            .then(([allPeople, allPlanets, allSpecies, allStarships, allVehicles]) => {
                return [
                    addTypeName(search(allPeople.people, regex), 'Person'),
                    addTypeName(search(allPlanets.planets, regex), 'Planet'),
                    addTypeName(search(allSpecies.species, regex), 'Specie'),
                    addTypeName(search(allStarships.starships, regex), 'Starship'),
                    addTypeName(search(allVehicles.vehicles, regex), 'Vehicle')
                ]
            })
            .then(([people, planets, species, starships, vehicles]) => {
                return [].concat(people, planets, species, starships, vehicles)
            })
    }
}

export default Query