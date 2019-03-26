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

//Vehicles failed

export function requestVehicleFailed() {
    return {
        type: types.REQUEST_VEHICLES_FAILED
    }
}

//Search by Vehicles Attriburetes
export function requestVehicleAttrSearch(values) {
    return {
        type: types.REQUEST_VEHICLES_ATTR_SEARCH,
        values
    }
}
export function searchVehicleAttrSuccess(values) {
    return {
        type: types.VEHICLES_ATTR_SEARCH_SUCCESS,
        values
    }
}

// create vehicles attributes actions
export function requestVehicleAttrCreate(values, apiName) {
    return {
        type: types.REQUEST_VEHICLES_ATTR_CREATE,
        values, apiName
    }
}

export function createVehiclesAttrSuccess(values,apiName) {
    return {
        type: types.ADD_VEHICLES_ATTR_SUCCESS,
        values, apiName
    }
}