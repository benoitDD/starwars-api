export function buildVariablesForPagination(pageSize, after, before){
    var variables = {}
    if(after){
        variables.after = after
        variables.first = pageSize
    }else if(before){
        variables.before = before
        variables.last = pageSize
    }else{
        variables.first = pageSize
    }
    return variables
}