import * as types from '../actions/action-types';


export function requestTransmissions(values) {
    return {
        type: types.REQUEST_TRANSMISSONS,
        values
    }
}
export function requestSubmitTransmission(values) {
    return {
        type: types.REQUEST_TRANSMISSONS_SUBMIT,
        values
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
export function requestTransmissionPages(pageNumber) {
    return {
        type: types.REQUEST_TRANSMISSONS_PAGES,
        pageNumber
    }
}
export function getTransmissionPages(transmission) {
    return {
        type: types.GET_TRANSMISSONS_PAGES,
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

export function requestUpdateTransmission( values, page) {
    return {
        type: types.REQUEST_TRANSMISSONS_UPDATE,
        values, page
    }
}

export function updateTransmissionSuccess(transmissionId, values) {
    return {
        type: types.UPDATE_TRANSMISSONS_SUCCESS,
        values,
        transmissionId
    }
}

export function requestTransmissionStatus (transmissionId,values, page) {
    return {
        type: types.REQUEST_TRANSMISSONS_STATUS,
        values,
        transmissionId, page
    }
}

export function TransmissionStatusSuccess (transmissionId, values) {
    return {
        type: types.TRANSMISSONS_STATUS_SUCCESS,
        values,
        transmissionId
    }
}