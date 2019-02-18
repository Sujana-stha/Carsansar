import * as types from '../actions/action-types';

export function requestMakes(token) {
    return {
        type: types.REQUEST_MAKES,
        token
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

export function requestUpdateMakes(values, page) {
    return {
        type: types.REQUEST_UPDATE,
        values, page
    }
}

export function updateMakesSuccess(makeId, values) {
    return {
        type: types.UPDATE_MAKES_SUCCESS,
        values,
        makeId
    }
}

export function requestMakesStatus (makeId,values, page) {
    return {
        type: types.REQUEST_MAKES_STATUS,
        values,
        makeId, page 
    }
}

export function MakesStatusSuccess (makeId, values, page) {
    return {
        type: types.MAKES_STATUS_SUCCESS,
        values,
        makeId,
        page
    }
}

