import * as types from '../actions/action-types';


export function requestOptions(pageNumber) {
    return {
        type: types.REQUEST_OPTIONS,
        pageNumber
    }
}
export function requestSubmitOptions(values) {
    return {
        type: types.REQUEST_OPTIONS_SUBMIT,
        values
    }
}

export function requestOptionsFailed() {
    return {
        type: types.REQUEST_OPTIONS_FAILED
    }
}
export function getOptionsSuccess(options) {
    return {
        type: types.GET_OPTIONS_SUCCESS,
        options
    }
}

export function addOptionsSuccess(values) {
    return {
        type: types.ADD_OPTIONS_SUCCESS,
        values
    }
}

export function requestDeleteOptions(optionId) {
    return {
        type: types.REQUEST_OPTIONS_DELETE,
        optionId
    }
}

export function deleteOptionsSuccess(optionId) {
    return {
        type: types.DELETE_OPTIONS_SUCCESS,
        optionId
    }
}

export function requestUpdateOptions( values, page) {
    return {
        type: types.REQUEST_OPTIONS_UPDATE,
        values, page
    }
}

export function updateOptionsSuccess(optionId, values) {
    return {
        type: types.UPDATE_OPTIONS_SUCCESS,
        values,
        optionId
    }
}

export function requestOptionsStatus (optionId,values, page) {
    return {
        type: types.REQUEST_OPTIONS_STATUS,
        values,
        optionId, page
    }
}

export function OptionsStatusSuccess (optionId, values) {
    return {
        type: types.OPTIONS_STATUS_SUCCESS,
        values,
        optionId
    }
}