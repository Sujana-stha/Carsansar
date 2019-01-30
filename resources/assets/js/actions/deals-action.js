import * as types from '../actions/action-types';

//ADD VEHICLES
export function requestSubmitVehicle(values) {
    return {
        type: types.REQUEST_VEHICLES_SUBMIT,
        values
    }
}

export function addVehicleSuccess(values) {
    return {
        type: types.ADD_VEHICLES_SUCCESS,
        values
    }
}

export function requestVehicleFailed() {
    return {
        type: types.REQUEST_VEHICLES_FAILED
    }
}