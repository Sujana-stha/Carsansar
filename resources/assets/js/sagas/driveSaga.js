import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as driveApi from '../api/drives-api';
import * as driveAction from '../actions/drives-action';
import {notify} from 'react-notify-toast'

//Get makes data in table
export function* DriveWatcher() {
    yield takeLatest(types.REQUEST_DRIVES, DriveSaga)
}
function* DriveSaga(action) {
    const response = yield call(driveApi.getDrives, action.pageNumber, action.sorted_column, action.order);
    const drives = response.data
    
    if (response.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all drives", "error", 5000)
    } else {
        yield put({type: types.GET_DRIVES_SUCCESS, drives});
    }
}

// Submit form data of makes
export function* submitDriveSaga() {
    yield takeLatest(types.REQUEST_DRIVES_SUBMIT, callDriveSubmit)
}
function* callDriveSubmit(action) {
    yield put(startSubmit('PostDrives'));
    let error = {};
    const result =  yield call(driveApi.addDrives, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error|| resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Drive Description already exists!","error", 5000);
        }
        notify.show("Cannot create new drive!", "error",5000)
    } else {
        // yield put({type: types.ADD_DRIVES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_DRIVES, pageNumber, sorted_column, order})
        notify.show(`Created successfully!`, "success", 5000)
    }
    yield put(stopSubmit('PostDrives', error));
    yield put(reset('PostDrives'));
}

//edit form data of makes
export function* editDriveSaga() {
    yield takeLatest(types.REQUEST_DRIVES_UPDATE, callEditDrive);
}

function* callEditDrive (action) {
    yield put(startSubmit('EditDrives'));
    let error = {};
    const result =  yield call(driveApi.updateDrives, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Update failed!`, "error",5000)

    } else {
        // yield put({type: types.UPDATE_DRIVES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_DRIVES, pageNumber, sorted_column, order})
        notify.show(`Updated successfully!`, "success", 5000)
    }
    yield put(stopSubmit('EditDrives', error));
    yield put(reset('EditDrives'));
}

// change status value
export function* toggleDrivesStatusSaga() {
    yield takeLatest(types.REQUEST_DRIVES_STATUS, callDriveToggleStatus);
}

function* callDriveToggleStatus(action) {
    const result =  yield call(driveApi.updateDrivesStatus, action.driveId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Update failed!`, "error",5000)

    } else {
        // yield put({type: types.DRIVES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_DRIVES, pageNumber, sorted_column, order})
        notify.show("Status Updated Successfully!", "success", 5000)
    }
}

// delete makes data from table
export function* deleteDriveSaga() {
    yield takeLatest(types.REQUEST_DRIVES_DELETE, callDeleteDrive)
}

function* callDeleteDrive(action) {
    const result = yield call(driveApi.deleteDrives, action.driveId);

    if(result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed!", "error", 5000)
    } else {
        yield put(driveAction.deleteDrivesSuccess(action.driveId, result.statusText));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 

