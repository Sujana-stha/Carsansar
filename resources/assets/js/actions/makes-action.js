import * as types from '../actions/action-types';

export function requestMakes(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_MAKES,
        pageNumber, sorted_column, order
    }
}
export function requestSubmitMake(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_SUBMIT,
        values, pageNumber,sorted_column, order
    }
}

export function requestFailed() {
    return {
        type: types.REQUEST_FAILED
    }
}
export function getMakesSuccess(makes) {
    return {
        type: types.GET_MAKES_SUCCESS,
        makes
    }
}

export function addMakesSuccess(values) {
    return {
        type: types.ADD_MAKES_SUCCESS,
        values
    }
}

export function requestDeleteMakes(makeId) {
    return {
        type: types.REQUEST_DELETE,
        makeId
    }
}

export function deleteMakesSuccess(makeId) {
    return {
        type: types.DELETE_MAKES_SUCCESS,
        makeId
    }
}

export function requestUpdateMakes(values, pageNumber, sorted_column,order) {
    return {
        type: types.REQUEST_UPDATE,
        values, pageNumber, sorted_column, order
    }
}

export function updateMakesSuccess(makeId, values) {
    return {
        type: types.UPDATE_MAKES_SUCCESS,
        values,
        makeId
    }
}

export function requestMakesStatus (makeId,values, pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_MAKES_STATUS,
        values,
        makeId, pageNumber, sorted_column, order
    }
}

export function MakesStatusSuccess (makeId, values, pageNumber) {
    return {
        type: types.MAKES_STATUS_SUCCESS,
        values,
        makeId,
        pageNumber
    }
}

