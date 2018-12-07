import * as types from '../actions/action-types';


export function requestMakes(values) {
    return {
        type: types.REQUEST_MAKES,
        values
    }
}
export function requestSubmitMakes(values) {
    return {
        type: types.REQUEST_SUBMIT,
        values
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

export function addMakesSuccess(values, message) {
    return {
        type: types.ADD_MAKES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteMakes(makeId) {
    return {
        type: types.REQUEST_DELETE,
        makeId
    }
}

export function deleteMakesSuccess(makeId, message) {
    return {
        type: types.DELETE_MAKES_SUCCESS,
        makeId, message
    }
}

export function requestUpdateMakes(makeId, values) {
    return {
        type: types.REQUEST_UPDATE,
        makeId,
        values
    }
}

export function updateMakesSuccess(makeId, values, message) {
    return {
        type: types.UPDATE_MAKES_SUCCESS,
        values,
        makeId,
        message
    }
}