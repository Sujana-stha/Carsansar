import * as types from '../actions/action-types';


export function requestTransmissions(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_TRANSMISSONS,
        pageNumber,sorted_column, order
    }
}
export function requestSubmitTransmission(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_TRANSMISSONS_SUBMIT,
        values, pageNumber,sorted_column, order
    }
}

export function requestTransmissionFailed() {
    return {
        type: types.REQUEST_TRANSMISSONS_FAILED
    }
}
export function getTransmissionSuccess(transmission) {
    return {
        type: types.GET_TRANSMISSONS_SUCCESS,
        transmission
    }
}

export function addTransmissionSuccess(values) {
    return {
        type: types.ADD_TRANSMISSONS_SUCCESS,
        values
    }
}

export function requestDeleteTransmission(transmissionId) {
    return {
        type: types.REQUEST_TRANSMISSONS_DELETE,
        transmissionId
    }
}

export function deleteTransmissionSuccess(transmissionId) {
    return {
        type: types.DELETE_TRANSMISSONS_SUCCESS,
        transmissionId
    }
}

export function requestUpdateTransmission( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_TRANSMISSONS_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateTransmissionSuccess(transmissionId, values) {
    return {
        type: types.UPDATE_TRANSMISSONS_SUCCESS,
        values,
        transmissionId
    }
}

export function requestTransmissionStatus (transmissionId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_TRANSMISSONS_STATUS,
        values,
        transmissionId, pageNumber,sorted_column, order
    }
}

export function TransmissionStatusSuccess (transmissionId, values) {
    return {
        type: types.TRANSMISSONS_STATUS_SUCCESS,
        values,
        transmissionId
    }
}