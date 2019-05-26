import {GraphQLDataSource} from 'apollo-datasource-graphql'

function mockOnceQuery(nameKey, value){
    GraphQLDataSource.prototype.query.mockReturnValueOnce(Promise.resolve({
        data: {
            [nameKey]: value
        }
    }))
}
    
function mockNullOnceQuery(){
    GraphQLDataSource.prototype.query.mockReturnValueOnce(Promise.resolve({
        data: {}
    }))
}

function mockThrowOnceQuery(error){
    GraphQLDataSource.prototype.query.mockImplementationOnce(() => (Promise.reject(error)))
}

const valuePaginationSWAPI = {
    totalCount: 50,
    pageInfo: {
        startCursor: 'object-5',
        endCursor: 'object-7'
    }
}

const valuePagination = {
    pageInfo: {
        startCursor: valuePaginationSWAPI.pageInfo.startCursor,
        endCursor: valuePaginationSWAPI.pageInfo.endCursor,
        totalCount: valuePaginationSWAPI.totalCount,
        hasPreviousPage: true,
        hasNextPage: true,
    }
}

function valueGetAllObjectSWAPI(key, value){
    return {
        ...valuePaginationSWAPI,
        [key]: value
    }
}
    
export {mockOnceQuery, mockNullOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination}