
//MAKES
export function RequestMakesList(values) {
    return {
        type: types.REQUEST_MAKES_LIST,
        values
    }
}
export function getMakesListSuccess(makes) {
    return {
        type: types.MAKES_LIST_SUCCESS,
        makes
    }
}