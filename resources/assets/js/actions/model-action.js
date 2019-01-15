import * as types from '../actions/action-types';


export function requestModel(values) {
    return {
        type: types.REQUEST_MODEL,
        values
    }
}
export function requestSubmitModel(values) {
    return {
        type: types.REQUEST_MODEL_SUBMIT,
        values
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
export function requestModelPages(pageNumber) {
    return {
        type: types.REQUEST_MODEL_PAGES,
        pageNumber
    }
}
export function getModelPages(models) {
    return {
        type: types.GET_MODEL_PAGES,
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

export function requestUpdateModel( values, page) {
    return {
        type: types.REQUEST_MODEL_UPDATE,
        values, page
    }
}

export function updateModelSuccess(modelId, values) {
    return {
        type: types.UPDATE_MODEL_SUCCESS,
        values,
        modelId
    }
}

export function requestModelStatus (modelId,values, page) {
    return {
        type: types.REQUEST_MODEL_STATUS,
        values,
        modelId, page
    }
}

export function ModelStatusSuccess (modelId, values) {
    return {
        type: types.MODEL_STATUS_SUCCESS,
        values,
        modelId
    }
}