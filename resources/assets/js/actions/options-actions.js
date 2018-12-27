import * as types from '../actions/action-types';


export function requestOptions(values) {
    return {
        type: types.REQUEST_OPTIONS,
        values
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
export function requestOptionsPages(pageNumber) {
    return {
        type: types.REQUEST_OPTIONS_PAGES,
        pageNumber
    }
}
export function getOptionsPages(options) {
    return {
        type: types.GET_OPTIONS_PAGES,
        options
    }
}
export function addOptionsSuccess(values, message) {
    return {
        type: types.ADD_OPTIONS_SUCCESS,
        values,
        message
    }
}

export function requestDeleteOptions(optionId) {
    return {
        type: types.REQUEST_OPTIONS_DELETE,
        optionId
    }
}

export function deleteOptionsSuccess(optionId, message) {
    return {
        type: types.DELETE_OPTIONS_SUCCESS,
        optionId, message
    }
}

export function requestUpdateOptions( values) {
    return {
        type: types.REQUEST_OPTIONS_UPDATE,
        values
    }
}

export function updateOptionsSuccess(optionId, values, message) {
    return {
        type: types.UPDATE_OPTIONS_SUCCESS,
        values,
        optionId,
        message
    }
}

export function requestOptionsStatus (optionId,values) {
    return {
        type: types.REQUEST_OPTIONS_STATUS,
        values,
        optionId  
    }
}

export function OptionsStatusSuccess (optionId, values, message) {
    return {
        type: types.OPTIONS_STATUS_SUCCESS,
        values,
        optionId,
        message
    }
}