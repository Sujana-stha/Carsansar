import {takeLatest, call, put, fork, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/makes-api';
import * as makeAction from '../actions/makes-action'


//Get makes data in table
export function* MakeWatcher() {
    yield takeLatest(types.REQUEST_MAKES, MakeSaga)
}
function* MakeSaga() {
    const response = yield call(api.getMakes);
    const makes = response.data
    yield put({type: types.GET_MAKES_SUCCESS, makes});
}

// Get Makes pagination in table
export function* MakesPagesWatcher() {
    yield takeLatest(types.REQUEST_MAKES_PAGES, callMakesPages)
}
function* callMakesPages(action) {
    const result =  yield call(api.getMakesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.GET_MAKES_PAGES, resp});
    }
}


// Submit form data of makes
export function* submitSaga() {
    yield takeLatest(types.REQUEST_SUBMIT, callSubmit)
}
function* callSubmit(action) {
    yield put(startSubmit('PostMakes'));
    let error = {};
    const result =  yield call(api.addMakes, action.values);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_MAKES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('PostMakes', error));
}

//edit form data of makes
export function* editSaga() {
    yield takeLatest(types.REQUEST_UPDATE, callEditMake);
}

function* callEditMake (action) {
    yield put(startSubmit('EditMakes'));
    let error = {};
    const result =  yield call(api.updateMake, action.values.id, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.UPDATE_MAKES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('EditMakes', error));
}

// change status value
export function* toggleStatusSaga() {
    yield takeLatest(types.REQUEST_MAKES_STATUS, callToggleStatus);
}

function* callToggleStatus(action) {
    let error = {};
    console.log('action', action)
    const result =  yield call(api.updateMakeStatus, action.makeId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.MAKES_STATUS_SUCCESS, resp, message: result.statusText});
    }
}


// delete makes data from table
export function* deleteSaga() {
    yield takeLatest(types.REQUEST_DELETE, callDeleteMake)
}

function* callDeleteMake(action) {
    const result = yield call(api.deleteMake, action.makeId);

    if(result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put(makeAction.deleteMakesSuccess(action.makeId, result.statusText));
    }
} 

