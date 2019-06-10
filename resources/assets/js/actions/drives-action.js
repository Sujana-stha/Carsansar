import * as types from '../actions/action-types';

//GET DRIVES LIST ACTION
export function requestDrives(pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_DRIVES,
        pageNumber,sorted_column, order
    }
}
export function getDrivesSuccess(drives) {
    return {
        type: types.GET_DRIVES_SUCCESS,
        drives
    }
}

//ADD NEW DRIVES ACTION
export function requestSubmitDrives(values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_DRIVES_SUBMIT,
        values, pageNumber,sorted_column, order
    }
}
export function addDrivesSuccess(values) {
    return {
        type: types.ADD_DRIVES_SUCCESS,
        values
    }
}

//DRIVES FAILED ACTION
export function requestDrivesFailed() {
    return {
        type: types.REQUEST_DRIVES_FAILED
    }
}

//DELETE DRIVES ACTIONS
export function requestDeleteDrives(driveId) {
    return {
        type: types.REQUEST_DRIVES_DELETE,
        driveId
    }
}

export function deleteDrivesSuccess(driveId) {
    return {
        type: types.DELETE_DRIVES_SUCCESS,
        driveId
    }
}

//UPDATE DRIVES ACTION
export function requestUpdateDrives( values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_DRIVES_UPDATE,
        values, pageNumber,sorted_column, order
    }
}

export function updateDrivesSuccess(driveId, values) {
    return {
        type: types.UPDATE_DRIVES_SUCCESS,
        values,
        driveId
    }
}

//DRIVE STATUS CHANGED ACTION
export function requestDrivesStatus (driveId,values, pageNumber,sorted_column, order) {
    return {
        type: types.REQUEST_DRIVES_STATUS,
        values,
        driveId, pageNumber,sorted_column, order
    }
}

export function DrivesStatusSuccess (driveId, values) {
    return {
        type: types.DRIVES_STATUS_SUCCESS,
        values,
        driveId
    }
}