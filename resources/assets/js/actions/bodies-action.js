import * as types from '../actions/action-types';


export function requestBodies(pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_BODIES,
        pageNumber, sorted_column, order
    }
}
export function requestSubmitBodies(values, pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_BODIES_SUBMIT,
        values, pageNumber, sorted_column, order
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

export function requestUpdateBodies( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_BODIES_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateBodiesSuccess(bodyId, values) {
    return {
        type: types.UPDATE_BODIES_SUCCESS,
        values,
        bodyId
    }
}

export function requestBodiesStatus (bodyId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_BODIES_STATUS,
        values,
        bodyId , pageNumber,sorted_column, order 
    }
}

export function BodiesStatusSuccess (bodyId, values) {
    return {
        type: types.BODIES_STATUS_SUCCESS,
        values,
        bodyId
    }
}