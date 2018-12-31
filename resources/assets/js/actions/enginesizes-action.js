import * as types from '../actions/action-types';


export function requestEnginesizes(values) {
    return {
        type: types.REQUEST_ENGINESIZES,
        values
    }
}
export function requestSubmitEnginesizes(values) {
    return {
        type: types.REQUEST_ENGINESIZES_SUBMIT,
        values
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
export function requestEnginesizesPages(pageNumber) {
    return {
        type: types.REQUEST_ENGINESIZES_PAGES,
        pageNumber
    }
}
export function getEnginesizesPages(enginesizes) {
    return {
        type: types.GET_ENGINESIZES_PAGES,
        enginesizes
    }
}
export function addEnginesizesSuccess(values, message) {
    return {
        type: types.ADD_ENGINESIZES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteEnginesizes(enginesizeId) {
    return {
        type: types.REQUEST_ENGINESIZES_DELETE,
        enginesizeId
    }
}

export function deleteEnginesizesSuccess(enginesizeId, message) {
    return {
        type: types.DELETE_ENGINESIZES_SUCCESS,
        enginesizeId, message
    }
}

export function requestUpdateEnginesizes( values) {
    return {
        type: types.REQUEST_ENGINESIZES_UPDATE,
        values
    }
}

export function updateEnginesizesSuccess(enginesizeId, values, message) {
    return {
        type: types.UPDATE_ENGINESIZES_SUCCESS,
        values,
        enginesizeId,
        message
    }
}

export function requestEnginesizesStatus (enginesizeId,values) {
    return {
        type: types.REQUEST_ENGINESIZES_STATUS,
        values,
        enginesizeId  
    }
}

export function EnginesizesStatusSuccess (enginesizeId, values, message) {
    return {
        type: types.ENGINESIZES_STATUS_SUCCESS,
        values,
        enginesizeId,
        message
    }
}