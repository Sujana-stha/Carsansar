import * as types from '../actions/action-types';


export function requestFueltypes(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_FUELTYPES,
        pageNumber,sorted_column, order
    }
}
export function requestSubmitFueltypes(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_FUELTYPES_SUBMIT,
        values, pageNumber,sorted_column, order
    }
}

export function requestFueltypesFailed() {
    return {
        type: types.REQUEST_FUELTYPES_FAILED
    }
}
export function getFueltypesSuccess(fueltypes) {
    return {
        type: types.GET_FUELTYPES_SUCCESS,
        fueltypes
    }
}

export function addFueltypesSuccess(values) {
    return {
        type: types.ADD_FUELTYPES_SUCCESS,
        values
    }
}

export function requestDeleteFueltypes(fueltypeId) {
    return {
        type: types.REQUEST_FUELTYPES_DELETE,
        fueltypeId
    }
}

export function deleteFueltypesSuccess(fueltypeId) {
    return {
        type: types.DELETE_FUELTYPES_SUCCESS,
        fueltypeId
    }
}

export function requestUpdateFueltypes( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_FUELTYPES_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateFueltypesSuccess(fueltypeId, values) {
    return {
        type: types.UPDATE_FUELTYPES_SUCCESS,
        values,
        fueltypeId
    }
}

export function requestFueltypesStatus (fueltypeId,values,pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_FUELTYPES_STATUS,
        values,
        fueltypeId, pageNumber,sorted_column, order 
    }
}

export function FueltypesStatusSuccess (fueltypeId, values) {
    return {
        type: types.FUELTYPES_STATUS_SUCCESS,
        values,
        fueltypeId
    }
}