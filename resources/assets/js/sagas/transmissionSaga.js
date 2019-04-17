import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/transmission-api';
import * as transmissionAction from '../actions/transmissons-actions'
import {notify} from 'react-notify-toast';

//Get Transmissons data in table
export function* TransmissionWatcher() {
    yield takeLatest(types.REQUEST_TRANSMISSONS, TransmissionSaga)
}
function* TransmissionSaga(action) {
    const response = yield call(api.getTransmission, action.pageNumber, action.sorted_column, action.order);
    const transmissions = response.data
    
    if (response.errors) {
        yield put({ type: types.REQUEST_TRANSMISSONS_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot Get all Transmissions", "error", 5000)
    } else {
        yield put({type: types.GET_TRANSMISSONS_SUCCESS, transmissions});
    }
}

// Submit form data of transmissions
export function* submitTransmissionSaga() {
    yield takeLatest(types.REQUEST_TRANSMISSONS_SUBMIT, callTransmissionSubmit)
}
function* callTransmissionSubmit(action) {
    yield put(startSubmit('PostTransmissions'));
    let error = {};
    const result =  yield call(api.addTransmission, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_TRANSMISSONS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Add Transmission!", "error", 5000)
    } else {
        // yield put({type: types.ADD_TRANSMISSONS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_TRANSMISSONS,pageNumber, sorted_column, order})
        notify.show(`${resp.transmission_desc} Transmission Added Successfully!`, "success", 5000)
    }
    yield put(stopSubmit('PostTransmissions', error));
    yield put(reset('PostTransmissions'));
}

//edit form data of transmissions
export function* editTransmissionSaga() {
    yield takeLatest(types.REQUEST_TRANSMISSONS_UPDATE, callEditTransmission);
}

function* callEditTransmission (action) {
    yield put(startSubmit('EditTransmissions'));
    let error = {};
    const result =  yield call(api.updateTransmission, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_TRANSMISSONS_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Update ${resp.transmission_desc}!`, "error", 5000)
    } else {
        // yield put({type: types.UPDATE_TRANSMISSONS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_TRANSMISSONS, pageNumber, sorted_column, order})
        notify.show(`${resp.transmission_desc} Updated Successfully!`, "success", 5000)
    }
    yield put(stopSubmit('EditTransmissions', error));
    yield put(reset('EditTransmissions'));
}

// change status value
export function* toggleTransmissionStatusSaga() {
    yield takeLatest(types.REQUEST_TRANSMISSONS_STATUS, callToggleTransmissionStatus);
}

function* callToggleTransmissionStatus(action) {
    const result =  yield call(api.updateTransmissionStatus, action.transmissionId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_TRANSMISSONS_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Change Status of ${resp.transmission_desc}!`, "error", 5000)
    } else {
        // yield put({type: types.TRANSMISSONS_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_TRANSMISSONS, pageNumber, sorted_column, order})
        notify.show(`Status of ${resp.transmission_desc} Updated!`, "success", 5000)
    }
}


// delete makes data from table
export function* deleteTransmissionSaga() {
    yield takeLatest(types.REQUEST_TRANSMISSONS_DELETE, callDeleteTransmission)
}

function* callDeleteTransmission(action) {
    const result = yield call(api.deleteTransmission, action.transmissionId);

    if(result.errors) {
        yield put({ type: types.REQUEST_TRANSMISSONS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Delete Transmission!", "error", 5000)
    } else {
        yield put(transmissionAction.deleteTransmissionSuccess(action.transmissionId, result.statusText));
        notify.show("Transmissioin Deleted Successfully!", "error", 5000)
    }
} 
