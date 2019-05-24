import {personsService} from '../persons'
import {GraphQLDataSource} from 'apollo-datasource-graphql'

const returnQueryMock = 'data'
GraphQLDataSource.prototype.query.mockReturnValue(Promise.resolve(returnQueryMock))

test('Récupérer les 10 premières personnes par default', () => {
    return expect(personsService.getAllPeople())
        .resolves
        .toEqual(returnQueryMock)
})

test('Récupérer les 10 premières personnes', () => {
    return expect(personsService.getAllPeople(10))
        .resolves
        .toEqual(returnQueryMock)
})

test('Récupérer les 10 personnes avant la 11ème personne', () => {
    return expect(personsService.getAllPeople(10, null, 'YXJyYXljb25uZWN0aW9uOjEw'))
        .resolves
        .toEqual(returnQueryMock)
})

test('Récupérer une personne', () => {
    return expect(personsService.getPerson('cGVvcGxlOjEw'))
        .resolves
        .toEqual(returnQueryMock)
})