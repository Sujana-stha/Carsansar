import * as types from '../actions/action-types';


export function requestModel(pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_MODEL,
        pageNumber, sorted_column, order
    }
}
export function requestSubmitModel(values, pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_MODEL_SUBMIT,
        values, pageNumber, sorted_column, order
    }
}

export function requestModelFailed() {
    return {
        type: types.REQUEST_MODEL_FAILED
    }
}
export function getModelSuccess(models) {
    return {
        type: types.GET_MODEL_SUCCESS,
        models
    }
}

export function addModelSuccess(values) {
    return {
        type: types.ADD_MODEL_SUCCESS,
        values
    }
}

export function requestDeleteModel(modelId) {
    return {
        type: types.REQUEST_MODEL_DELETE,
        modelId
    }
}

export function deleteModelSuccess(modelId) {
    return {
        type: types.DELETE_MODEL_SUCCESS,
        modelId
    }
}

export function requestUpdateModel( values, pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_MODEL_UPDATE,
        values, pageNumber, sorted_column, order
    }
}

export function updateModelSuccess(modelId, values) {
    return {
        type: types.UPDATE_MODEL_SUCCESS,
        values,
        modelId
    }
}

export function requestModelStatus (modelId,values, pageNumber, sorted_column, order) {
    return {
        type: types.REQUEST_MODEL_STATUS,
        values,
        modelId, pageNumber, sorted_column, order
    }
}

export function ModelStatusSuccess (modelId, values) {
    return {
        type: types.MODEL_STATUS_SUCCESS,
        values,
        modelId
    }
}