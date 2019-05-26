/*
Dans l'argument objets, il y a au minimum
{
    totalCount
    pageInfo: {
        endCursor
        startCursor
    }
}
*/
export function getPageInfo(objets, cursorFirstObjet, cursorLastObjet){
    return {
        startCursor: objets.pageInfo.startCursor,
        endCursor: objets.pageInfo.endCursor,
        totalCount: objets.totalCount,
        hasPreviousPage: objets.totalCount && objets.pageInfo.startCursor !== cursorFirstObjet,
        hasNextPage: objets.totalCount && objets.pageInfo.endCursor !== cursorLastObjet,
    }
}