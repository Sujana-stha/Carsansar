import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/enginesize-api';
import * as enginesizeAction from '../actions/enginesizes-action'
import {notify} from 'react-notify-toast'

//Get Enginesize data in table
export function* EnginesizeWatcher() {
    yield takeLatest(types.REQUEST_ENGINESIZES, EnginesizeSaga)
}
function* EnginesizeSaga(action) {
    const response = yield call(api.getEnginesizes, action.pageNumber, action.sorted_column, action.order);
    const enginesizes = response.data
    yield put({type: types.GET_ENGINESIZES_SUCCESS, enginesizes});
    if (response.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all engines", "error", 5000)
    } else {
        yield put({type: types.GET_ENGINESIZES_SUCCESS, enginesizes});
    }
}

// Submit form data of Enginesize
export function* submitEnginesizeSaga() {
    yield takeLatest(types.REQUEST_ENGINESIZES_SUBMIT, callEnginesizeSubmit)
}
function* callEnginesizeSubmit(action) {
    yield put(startSubmit('PostEnginesizes'));
    let error = {};
    const result =  yield call(api.addEnginesizes, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.errors || resp.errormsg;
        if(resp.errorcode==23000) {
            notify.show("Engine Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Engine!", "error", 5000)
    } else {
        // yield put({type: types.ADD_ENGINESIZES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_ENGINESIZES, pageNumber, sorted_column, order})
        notify.show("Created successfully!", "success", 5000)
    }
    yield put(stopSubmit('PostEnginesizes', error));
    yield put(reset('PostEnginesizes'));
}

//edit form data of Enginesize
export function* editEnginesizeSaga() {
    yield takeLatest(types.REQUEST_ENGINESIZES_UPDATE, callEditEnginesize);
}

function* callEditEnginesize (action) {
    yield put(startSubmit('EditEnginesizes'));
    let error = {};
    const result =  yield call(api.updateEnginesizes, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed!", "error", 5000)

    } else {
        // yield put({type: types.UPDATE_ENGINESIZES_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_ENGINESIZES, pageNumber, sorted_column, order})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditEnginesizes', error));
    yield put(reset('EditEnginesizes'));
}

// change status value
export function* toggleEnginesizeStatusSaga() {
    yield takeLatest(types.REQUEST_ENGINESIZES_STATUS, callToggleEnginesizeStatus);
}

function* callToggleEnginesizeStatus(action) {
    const result =  yield call(api.updateEnginesizesStatus, action.enginesizeId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot update status !", "error", 5000)

    } else {
        // yield put({type: types.ENGINESIZES_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_ENGINESIZES, pageNumber, sorted_column, order})
        notify.show("Status updated successfully!", "success", 3000)
    }
}

// delete Enginesize data from table
export function* deleteEnginesizeSaga() {
    yield takeLatest(types.REQUEST_ENGINESIZES_DELETE, callDeleteEnginesize)
}

function* callDeleteEnginesize(action) {
    const result = yield call(api.deleteEnginesizes, action.enginesizeId);

    if(result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed!", "error", 5000)
    } else {
        yield put(enginesizeAction.deleteEnginesizesSuccess(action.enginesizeId, result.statusText));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 
