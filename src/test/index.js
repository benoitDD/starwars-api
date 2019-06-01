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

const objectMore = {
    idExternal: '123456789',
    type: 'Person',
    imagesHeader: [{
        _id: '5cf1935c0b953f43f84432f4',
        description: '',
        filename: '/images/78092401.jpeg',
        title: 'luke skywalker',
        __typename: 'Image'
    }, {
        _id: '5cf193bf0b953f43f84432f5',
        description: '',
        filename: '/images/661149c0.jpeg',
        title: 'luke skywalker with saberlight',
        __typename: 'Image'
    }],
    __typename: 'ObjectMore'
}
    
export {mockOnceQuery, mockNullOnceQuery, mockThrowOnceQuery, valueGetAllObjectSWAPI, valuePagination,
    objectMore}