import * as types from '../actions/action-types';


export function requestFueltypes(values) {
    return {
        type: types.REQUEST_FUELTYPES,
        values
    }
}
export function requestSubmitFueltypes(values) {
    return {
        type: types.REQUEST_FUELTYPES_SUBMIT,
        values
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
export function requestFueltypesPages(pageNumber) {
    return {
        type: types.REQUEST_FUELTYPES_PAGES,
        pageNumber
    }
}
export function getFueltypesPages(fueltypes) {
    return {
        type: types.GET_FUELTYPES_PAGES,
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

export function requestUpdateFueltypes( values, page) {
    return {
        type: types.REQUEST_FUELTYPES_UPDATE,
        values, page
    }
}

export function updateFueltypesSuccess(fueltypeId, values) {
    return {
        type: types.UPDATE_FUELTYPES_SUCCESS,
        values,
        fueltypeId
    }
}

export function requestFueltypesStatus (fueltypeId,values,page) {
    return {
        type: types.REQUEST_FUELTYPES_STATUS,
        values,
        fueltypeId, page 
    }
}

export function FueltypesStatusSuccess (fueltypeId, values) {
    return {
        type: types.FUELTYPES_STATUS_SUCCESS,
        values,
        fueltypeId
    }
}