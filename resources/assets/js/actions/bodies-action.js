import * as types from '../actions/action-types';


export function requestBodies(values) {
    return {
        type: types.REQUEST_BODIES,
        values
    }
}
export function requestSubmitBodies(values) {
    return {
        type: types.REQUEST_BODIES_SUBMIT,
        values
    }
}

export function requestBodiesFailed() {
    return {
        type: types.REQUEST_BODIES_FAILED
    }
}
export function getBodiesSuccess(bodies) {
    return {
        type: types.GET_BODIES_SUCCESS,
        bodies
    }
}
export function requestBodiesPages(pageNumber) {
    return {
        type: types.REQUEST_BODIES_PAGES,
        pageNumber
    }
}
export function getBodiesPages(bodies) {
    return {
        type: types.GET_BODIES_PAGES,
        bodies
    }
}
export function addBodiesSuccess(values, message) {
    return {
        type: types.ADD_BODIES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteBodies(bodyId) {
    return {
        type: types.REQUEST_BODIES_DELETE,
        bodyId
    }
}

export function deleteBodiesSuccess(bodyId, message) {
    return {
        type: types.DELETE_BODIES_SUCCESS,
        bodyId, message
    }
}

export function requestUpdateBodies( values, page) {
    return {
        type: types.REQUEST_BODIES_UPDATE,
        values, page
    }
}

export function updateBodiesSuccess(bodyId, values) {
    return {
        type: types.UPDATE_BODIES_SUCCESS,
        values,
        bodyId
    }
}

export function requestBodiesStatus (bodyId,values, page) {
    return {
        type: types.REQUEST_BODIES_STATUS,
        values,
        bodyId , page 
    }
}

export function BodiesStatusSuccess (bodyId, values) {
    return {
        type: types.BODIES_STATUS_SUCCESS,
        values,
        bodyId
    }
}