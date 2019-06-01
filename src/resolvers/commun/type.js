const Type = {
    starwarsObject: {
        __resolveType: (object) => {
            return object.__typename
        }
    },
    Image: {
        filename: image => {
            return `${process.env.PATH_IMAGES}/${image.filename}`
        }
    },
    ObjectMore: {
        imagesHeader: (objectMore, {first= false}) => {
            return first && objectMore.imagesHeader &&  objectMore.imagesHeader.length?
                [objectMore.imagesHeader[0]]
                : 
                objectMore.imagesHeader
        }
    }
}

export default Type