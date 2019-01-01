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
export function addFueltypesSuccess(values, message) {
    return {
        type: types.ADD_FUELTYPES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteFueltypes(fueltypeId) {
    return {
        type: types.REQUEST_FUELTYPES_DELETE,
        fueltypeId
    }
}

export function deleteFueltypesSuccess(fueltypeId, message) {
    return {
        type: types.DELETE_FUELTYPES_SUCCESS,
        fueltypeId, message
    }
}

export function requestUpdateFueltypes( values) {
    return {
        type: types.REQUEST_FUELTYPES_UPDATE,
        values
    }
}

export function updateFueltypesSuccess(fueltypeId, values, message) {
    return {
        type: types.UPDATE_FUELTYPES_SUCCESS,
        values,
        fueltypeId,
        message
    }
}

export function requestFueltypesStatus (fueltypeId,values) {
    return {
        type: types.REQUEST_FUELTYPES_STATUS,
        values,
        fueltypeId  
    }
}

export function FueltypesStatusSuccess (fueltypeId, values, message) {
    return {
        type: types.FUELTYPES_STATUS_SUCCESS,
        values,
        fueltypeId,
        message
    }
}