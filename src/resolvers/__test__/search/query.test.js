import Query from '../../search/query'
import {dataSources} from '../../../dataSources'
import {mockOnceQuery, valueGetAllObjectSWAPI} from '../../../test'

const persons = [
    {name: 'Luke skywalker'},
    {name: 'Leia organa'},
    {name: 'Dark vador'}
]

const planets = [
    {name: 'Tatooine'},
    {name: 'Coruscant'},
    {name: 'Naboo'}
]

const species = [
    {name: 'Human'},
    {name: 'Droid'},
    {name: 'Naboo'}
]

const starships = [
    {name: 'Theta-class T-2c shuttle'},
    {name: 'Belbullab-22 starfighter'},
    {name: 'TIE Advanced x1'}
]

const vehicles = [
    {name: 'T-16 skyhopper'},
    {name: 'X-34 landspeeder'},
    {name: 'Koro-2 Exodrive airspeeder'}
]

function mockQuery(){
    mockOnceQuery('allPeople', valueGetAllObjectSWAPI('people', persons))
    mockOnceQuery('allPlanets', valueGetAllObjectSWAPI('planets', planets))
    mockOnceQuery('allSpecies', valueGetAllObjectSWAPI('species', species))
    mockOnceQuery('allStarships', valueGetAllObjectSWAPI('starships', starships))
    mockOnceQuery('allVehicles', valueGetAllObjectSWAPI('vehicles', vehicles))
}

const search = Query.search
test('Search only Luke Skywalker', () => {
    mockQuery()
    return expect(search(null, {text: 'luke'}, {dataSources}))
        .resolves
        .toEqual([
            {name: 'Luke skywalker', __typename: 'Person'}
        ])
})

test('Search text "ta", must return many results', () => {
    mockQuery()
    return expect(search(null, {text: 'ta'}, {dataSources}))
        .resolves
        .toEqual([
            {name: 'Tatooine', __typename: 'Planet'},
            {name: 'Theta-class T-2c shuttle', __typename: 'Starship'},
            {name: 'Belbullab-22 starfighter', __typename: 'Starship'}
        ])
})