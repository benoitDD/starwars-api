class GraphQLDataSource {
}
GraphQLDataSource.prototype.query = jest.fn().mockImplementation(() => Promise.resolve({data:'anything'}))
export {GraphQLDataSource}