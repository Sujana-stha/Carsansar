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
function* EnginesizeSaga() {
    const response = yield call(api.getEnginesizes);
    const enginesizes = response.data
    yield put({type: types.GET_ENGINESIZES_SUCCESS, enginesizes});
}

// Get Enginesize pagination in table
export function* EnginesizePagesWatcher() {
    yield takeLatest(types.REQUEST_ENGINESIZES_PAGES, callEnginesizesPages)
}
function* callEnginesizesPages(action) {
    const result =  yield call(api.getEnginesizesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.GET_ENGINESIZES_PAGES, resp});
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

    if (result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_ENGINESIZES_SUCCESS, resp, message: result.statusText});
        notify.show("Engine Added Successfully!", "success", 5000)
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

    if (result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.UPDATE_ENGINESIZES_SUCCESS, resp, message: result.statusText});
        notify.show("Engine Updated Successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditEnginesizes', error));
    yield put(reset('EditEnginesizes'));
}

// change status value
export function* toggleEnginesizeStatusSaga() {
    yield takeLatest(types.REQUEST_ENGINESIZES_STATUS, callToggleEnginesizeStatus);
}

function* callToggleEnginesizeStatus(action) {
    let error = {};
    console.log('action', action)
    const result =  yield call(api.updateEnginesizesStatus, action.enginesizeId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_ENGINESIZES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.ENGINESIZES_STATUS_SUCCESS, resp, message: result.statusText});
        notify.show("Status of  Updated!", "success", 5000)
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
    } else {
        yield put(enginesizeAction.deleteEnginesizesSuccess(action.enginesizeId, result.statusText));
        notify.show("Engine Deleted Successfully!", "error", 5000)
    }
} 

