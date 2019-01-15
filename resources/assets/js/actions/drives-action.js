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
export function addDrivesSuccess(values) {
    return {
        type: types.ADD_DRIVES_SUCCESS,
        values
    }
}

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

export function requestUpdateDrives( values, page) {
    return {
        type: types.REQUEST_DRIVES_UPDATE,
        values, page
    }
}

export function updateDrivesSuccess(driveId, values) {
    return {
        type: types.UPDATE_DRIVES_SUCCESS,
        values,
        driveId
    }
}

export function requestDrivesStatus (driveId,values, page) {
    return {
        type: types.REQUEST_DRIVES_STATUS,
        values,
        driveId, page
    }
}

export function DrivesStatusSuccess (driveId, values) {
    return {
        type: types.DRIVES_STATUS_SUCCESS,
        values,
        driveId
    }
}