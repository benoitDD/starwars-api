const responseGetAllPerson =  {
    totalCount: 50,
    pageInfo: {
        startCursor: 'person-5',
        endCursor: 'person-7'
    },
    people: [{id: '1', name: 'toto'}, {id: '2', name: 'titi'}]
}

let getAllPeople = jest.fn(() => 
    (Promise.resolve({
        data: {
            allPeople: responseGetAllPerson
        }
    }))
)

const responseGetPerson = {
    id: 'id-1',
    name: 'toto'
}

let getPerson = jest.fn(() => 
    (Promise.resolve({
        data: {
            person: responseGetPerson
        }
    }))
)

let dataSourcesMock = {
    swapi: {
        persons: {
            getAllPeople,
            getPerson
        }
    }
}

export {dataSourcesMock, responseGetAllPerson, responseGetPerson}