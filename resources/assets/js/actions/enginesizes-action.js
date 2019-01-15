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

export function requestUpdateEnginesizes( values, page) {
    return {
        type: types.REQUEST_ENGINESIZES_UPDATE,
        values, page
    }
}

export function updateEnginesizesSuccess(enginesizeId, values) {
    return {
        type: types.UPDATE_ENGINESIZES_SUCCESS,
        values,
        enginesizeId
    }
}

export function requestEnginesizesStatus (enginesizeId,values, page) {
    return {
        type: types.REQUEST_ENGINESIZES_STATUS,
        values,
        enginesizeId, page 
    }
}

export function EnginesizesStatusSuccess (enginesizeId, values) {
    return {
        type: types.ENGINESIZES_STATUS_SUCCESS,
        values,
        enginesizeId
    }
}