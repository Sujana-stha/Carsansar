import * as types from '../actions/action-types';


export function requestMakes(values) {
    return {
        type: types.REQUEST_MAKES,
        values
    }
}
export function requestSubmitMake(values) {
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
export function requestMakesPages(pageNumber) {
    return {
        type: types.REQUEST_MAKES_PAGES,
        pageNumber
    }
}
export function getMakesPages(makes) {
    return {
        type: types.GET_MAKES_PAGES,
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

export function requestUpdateMakes(values, page) {
    return {
        type: types.REQUEST_UPDATE,
        values, page
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

export function requestMakesStatus (makeId,values) {
    return {
        type: types.REQUEST_MAKES_STATUS,
        values,
        makeId  
    }
}

export function MakesStatusSuccess (makeId, values, message) {
    return {
        type: types.MAKES_STATUS_SUCCESS,
        values,
        makeId,
        message
    }
}

export function requestMakesSingle (makeId) {
    return {
        type: types.REQUEST_MAKES_SINGLE,
        makeId
    }
}

export function makesSingleSuccess (makes) {
    return {
        type: types.MAKES_SINGLE_SUCCESS,
        makes
    }
}