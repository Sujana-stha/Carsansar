import * as types from '../actions/action-types';


export function requestEnginesizes(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_ENGINESIZES,
        pageNumber,sorted_column, order
    }
}
export function requestSubmitEnginesizes(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_ENGINESIZES_SUBMIT,
        values, pageNumber,sorted_column, order
    }
}

export function requestEnginesizesFailed() {
    return {
        type: types.REQUEST_ENGINESIZES_FAILED
    }
}
export function getEnginesizesSuccess(enginesizes) {
    return {
        type: types.GET_ENGINESIZES_SUCCESS,
        enginesizes
    }
}

export function addEnginesizesSuccess(values) {
    return {
        type: types.ADD_ENGINESIZES_SUCCESS,
        values
    }
}

export function requestDeleteEnginesizes(enginesizeId) {
    return {
        type: types.REQUEST_ENGINESIZES_DELETE,
        enginesizeId
    }
}

export function deleteEnginesizesSuccess(enginesizeId) {
    return {
        type: types.DELETE_ENGINESIZES_SUCCESS,
        enginesizeId
    }
}

export function requestUpdateEnginesizes( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_ENGINESIZES_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateEnginesizesSuccess(enginesizeId, values) {
    return {
        type: types.UPDATE_ENGINESIZES_SUCCESS,
        values,
        enginesizeId
    }
}

export function requestEnginesizesStatus (enginesizeId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_ENGINESIZES_STATUS,
        values,
        enginesizeId, pageNumber,sorted_column, order 
    }
}

export function EnginesizesStatusSuccess (enginesizeId, values) {
    return {
        type: types.ENGINESIZES_STATUS_SUCCESS,
        values,
        enginesizeId
    }
}