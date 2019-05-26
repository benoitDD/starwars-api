import {swapiService} from '../index'
import {mockNullOnceQuery, mockOnceQuery} from '../../test'

test('Récupérer les 10 premières objets par default suivant la requête', () => {
    const response = 'toto1 toto2'
    const key = 'persons'
    mockOnceQuery(key, response)
    return expect(swapiService.getAllObjets(key))
        .resolves
        .toBe(response)
})

test('Récupérer les 10 premières objets par default d\'un objet suivant la requête', () => {
    const response = 'toto1 toto2'
    const key = 'starships'
    mockOnceQuery(key, response)
    return expect(swapiService.getAllObjetsOfObject('starships'))
        .resolves
        .toEqual(response)
})

describe('Service des personnes', () => {
    test('Récupérer les 10 premières personnes par default', () => {
        const response = 'toto1 toto2'
        mockOnceQuery('allPeople', response)
        return expect(swapiService.getAllPeople())
            .resolves
            .toEqual(response)
    })
    
    test('Récupérer une personne', () => {
        const response = 'toto1'
        mockOnceQuery('person', response)
        return expect(swapiService.getPerson('cGVvcGxlOjEw'))
            .resolves
            .toEqual(response)
    })
    
    describe('Récupérer la planète de la personne', () => {
        test('La planète existe', () => {
            const homeworld = 'toto'
            mockOnceQuery('person', { homeworld })
            return expect(swapiService.getPlanetOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toEqual(homeworld)
        })
        test('La personne n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getPlanetOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })
    
    describe('Récupérer l\'espèce de la personne', () => {
        test('L\'espèce existe', () => {
            const species = 'toto'
            mockOnceQuery('person', { species })
            return expect(swapiService.getSpecieOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toEqual(species)
        })
        test('La personne n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getSpecieOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })

    describe('Récupérer les vaisseaux de la personne', () => {
        test('les vaisseaux existent', () => {
            const starshipConnection = 'toto'
            mockOnceQuery('person', { starshipConnection })
            return expect(swapiService.getAllStarshipsOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toEqual(starshipConnection)
        })
        test('La personne n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getAllStarshipsOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })

    describe('Récupérer les véhicules de la personne', () => {
        test('les véhicules existent', () => {
            const vehicleConnection = 'toto'
            mockOnceQuery('person', { vehicleConnection })
            return expect(swapiService.getAllVehiclesOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toEqual(vehicleConnection)
        })
        test('La personne n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getAllVehiclesOfPerson('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })
})

describe('Service des planètes', () => {
    test('Récupérer une planète', () => {
        const response = 'toto1'
        mockOnceQuery('planet', response)
        return expect(swapiService.getPlanet('cGVvcGxlOjEw'))
            .resolves
            .toEqual(response)
    })
    
    test('Récupérer les 10 premières planètes par default', () => {
        const response = 'toto1 toto2'
        mockOnceQuery('allPlanets', response)
        return expect(swapiService.getAllPlanets())
            .resolves
            .toEqual(response)
    })

    describe('Récupérer les personnes de la planètes', () => {
        test('les personnes existent', () => {
            const residentConnection = 'toto'
            mockOnceQuery('planet', { residentConnection })
            return expect(swapiService.getAllPersonsOfPlanet('cGVvcGxlOjEw'))
                .resolves
                .toEqual(residentConnection)
        })
        test('La planète n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getAllPersonsOfPlanet('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })
})

describe('Service des espèces', () => {
    test('Récupérer une espèce', () => {
        const response = 'toto1'
        mockOnceQuery('species', response)
        return expect(swapiService.getSpecie('cGVvcGxlOjEw'))
            .resolves
            .toEqual(response)
    })
    
    test('Récupérer les 10 premières espèces par default', () => {
        const response = 'toto1 toto2'
        mockOnceQuery('allSpecies', response)
        return expect(swapiService.getAllSpecies())
            .resolves
            .toEqual(response)
    })

    describe('Récupérer les personnes de l\'espèce', () => {
        test('les personnes existent', () => {
            const personConnection = 'toto'
            mockOnceQuery('species', { personConnection })
            return expect(swapiService.getAllPersonsOfSpecie('cGVvcGxlOjEw'))
                .resolves
                .toEqual(personConnection)
        })
        test('L\'espèce n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getAllPersonsOfSpecie('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })

    describe('Récupérer la planète de l\'espèce', () => {
        test('La planète existe', () => {
            const homeworld = 'toto'
            mockOnceQuery('species', { homeworld })
            return expect(swapiService.getPlanetOfSpecie('cGVvcGxlOjEw'))
                .resolves
                .toEqual(homeworld)
        })
        test('L\'espèce n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getPlanetOfSpecie('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })
})

describe('Service des vaisseaux', () => {
    test('Récupérer un vaisseau', () => {
        const response = 'toto1'
        mockOnceQuery('starship', response)
        return expect(swapiService.getStarship('cGVvcGxlOjEw'))
            .resolves
            .toEqual(response)
    })
    
    test('Récupérer les 10 premières vaisseaux par default', () => {
        const response = 'toto1 toto2'
        mockOnceQuery('allStarships', response)
        return expect(swapiService.getAllStarships())
            .resolves
            .toEqual(response)
    })

    describe('Récupérer les personnes du vaisseau', () => {
        test('les personnes existent', () => {
            const pilotConnection = 'toto'
            mockOnceQuery('starship', { pilotConnection })
            return expect(swapiService.getAllPersonsOfStarship('cGVvcGxlOjEw'))
                .resolves
                .toEqual(pilotConnection)
        })
        test('Le vaisseau n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getAllPersonsOfStarship('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })
})

describe('Service des véhicules', () => {
    test('Récupérer un vehicule', () => {
        const response = 'toto1'
        mockOnceQuery('vehicle', response)
        return expect(swapiService.getVehicle('cGVvcGxlOjEw'))
            .resolves
            .toEqual(response)
    })
    
    test('Récupérer les 10 premières vehicules par default', () => {
        const response = 'toto1 toto2'
        mockOnceQuery('allVehicles', response)
        return expect(swapiService.getAllVehicles())
            .resolves
            .toEqual(response)
    })

    describe('Récupérer les personnes du véhicule', () => {
        test('les personnes existent', () => {
            const pilotConnection = 'toto'
            mockOnceQuery('vehicle', { pilotConnection })
            return expect(swapiService.getAllPersonsOfVehicle('cGVvcGxlOjEw'))
                .resolves
                .toEqual(pilotConnection)
        })
        test('Le véhicule n\'existe pas', () => {
            mockNullOnceQuery()
            return expect(swapiService.getAllPersonsOfVehicle('cGVvcGxlOjEw'))
                .resolves
                .toBeNull()
        })
    })
})