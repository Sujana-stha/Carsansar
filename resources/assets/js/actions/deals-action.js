import * as types from '../actions/action-types';

//GET VEHICLES LIST
export function requestVehicles() {
    return {
        type: types.REQUEST_VEHICLES
    }
}

export function getVehcilesSuccess(vehicles) {
    return {
        type: types.GET_VEHICLES_SUCCESS,
        vehicles
    }
}

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

//edit vehicles
export function requestVehiclesUpdate(values) {
    return {    
        type: types.REQUEST_VEHICLES_UPDATE,
        values
    }
}

export function UpdateVehiclesSuccess(values) {
    return {
        type: types.UPDATE_VEHICLES_SUCCESS,
        values
    }
}

//Vehicles failed

export function requestVehicleFailed() {
    return {
        type: types.REQUEST_VEHICLES_FAILED
    }
}

//Search by Vehicles titls
export function searchVehicleByTitle(values) {
    return {
        type: types.SEARCH_VEHICLE_BY_TITLE,
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