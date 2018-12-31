import * as types from '../actions/action-types';


export function requestDrives(values) {
    return {
        type: types.REQUEST_DRIVES,
        values
    }
}
export function requestSubmitDrives(values) {
    return {
        type: types.REQUEST_DRIVES_SUBMIT,
        values
    }
}

export function requestDrivesFailed() {
    return {
        type: types.REQUEST_DRIVES_FAILED
    }
}
export function getDrivesSuccess(drives) {
    return {
        type: types.GET_DRIVES_SUCCESS,
        drives
    }
}
export function requestDrivesPages(pageNumber) {
    return {
        type: types.REQUEST_DRIVES_PAGES,
        pageNumber
    }
}
export function getDrivesPages(drives) {
    return {
        type: types.GET_DRIVES_PAGES,
        drives
    }
}
export function addDrivesSuccess(values, message) {
    return {
        type: types.ADD_DRIVES_SUCCESS,
        values,
        message
    }
}

export function requestDeleteDrives(driveId) {
    return {
        type: types.REQUEST_DRIVES_DELETE,
        driveId
    }
}

export function deleteDrivesSuccess(driveId, message) {
    return {
        type: types.DELETE_DRIVES_SUCCESS,
        driveId, message
    }
}

export function requestUpdateDrives( values) {
    return {
        type: types.REQUEST_DRIVES_UPDATE,
        values
    }
}

export function updateDrivesSuccess(driveId, values, message) {
    return {
        type: types.UPDATE_DRIVES_SUCCESS,
        values,
        driveId,
        message
    }
}

export function requestDrivesStatus (driveId,values) {
    return {
        type: types.REQUEST_DRIVES_STATUS,
        values,
        driveId  
    }
}

export function DrivesStatusSuccess (driveId, values, message) {
    return {
        type: types.DRIVES_STATUS_SUCCESS,
        values,
        driveId,
        message
    }
}