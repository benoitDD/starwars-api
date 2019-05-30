const Type = {
    SearchResult: {
        __resolveType: (object) => {
            return object.__typename
        }
    }
}

export default Type