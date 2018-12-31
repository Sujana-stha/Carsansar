import {takeLatest, call, put, fork, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as driveApi from '../api/drives-api';
import * as driveAction from '../actions/drives-action';


//Get makes data in table
export function* DriveWatcher() {
    yield takeLatest(types.REQUEST_DRIVES, DriveSaga)
}
function* DriveSaga() {
    const response = yield call(driveApi.getDrives);
    const drives = response.data
    yield put({type: types.GET_DRIVES_SUCCESS, drives});
}

// Get Makes pagination in table
export function* DrivesPagesWatcher() {
    yield takeLatest(types.REQUEST_DRIVES_PAGES, callDrivesPages)
}
function* callDrivesPages(action) {
    const result =  yield call(driveApi.getDrivesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.GET_DRIVES_PAGES, resp});
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

    if (result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_DRIVES_SUCCESS, resp, message: result.statusText});
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

    if (result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.UPDATE_DRIVES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('EditDrives', error));
    yield put(reset('EditDrives'));
}

// change status value
export function* toggleDrivesStatusSaga() {
    yield takeLatest(types.REQUEST_DRIVES_STATUS, callDriveToggleStatus);
}

function* callDriveToggleStatus(action) {
    let error = {};
    console.log('action', action)
    const result =  yield call(driveApi.updateDrivesStatus, action.driveId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_DRIVES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.DRIVES_STATUS_SUCCESS, resp, message: result.statusText});
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
    } else {
        yield put(driveAction.deleteDrivesSuccess(action.driveId, result.statusText));
    }
} 

