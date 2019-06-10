import * as types from '../actions/action-types';


export function requestOptions(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_OPTIONS,
        pageNumber,sorted_column, order
    }
}
export function requestSubmitOptions(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_OPTIONS_SUBMIT,
        values, pageNumber,sorted_column, order
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

export function requestUpdateOptions( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_OPTIONS_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateOptionsSuccess(optionId, values) {
    return {
        type: types.UPDATE_OPTIONS_SUCCESS,
        values,
        optionId
    }
}

export function requestOptionsStatus (optionId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_OPTIONS_STATUS,
        values,
        optionId, pageNumber,sorted_column, order
    }
}

export function OptionsStatusSuccess (optionId, values) {
    return {
        type: types.OPTIONS_STATUS_SUCCESS,
        values,
        optionId
    }
}