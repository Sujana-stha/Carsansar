import {takeLatest, call, put, fork, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/bodies-api';
import * as bodyAction from '../actions/bodies-action'


//Get bodies data in table
export function* BodyWatcher() {
    yield takeLatest(types.REQUEST_BODIES, BodySaga)
}
function* BodySaga() {
    const response = yield call(api.getBodies);
    const bodies = response.data
    yield put({type: types.GET_BODIES_SUCCESS, bodies});
}

// Get Makes pagination in table
export function* BodiesPagesWatcher() {
    yield takeLatest(types.REQUEST_BODIES_PAGES, callBodiesPages)
}
function* callBodiesPages(action) {
    const result =  yield call(api.getBodiesPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.GET_BODIES_PAGES, resp});
    }
}


// Submit form data of makes
export function* submitBodySaga() {
    yield takeLatest(types.REQUEST_BODIES_SUBMIT, callBodySubmit)
}
function* callBodySubmit(action) {
    yield put(startSubmit('PostBodies'));
    let error = {};
    const result =  yield call(api.addBodies, action.values);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_BODIES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('PostBodies', error));
    yield put(reset('PostBodies'));
}

//edit form data of makes
export function* editBodySaga() {
    yield takeLatest(types.REQUEST_BODIES_UPDATE, callEditBody);
}

function* callEditBody (action) {
    yield put(startSubmit('EditBodies'));
    let error = {};
    const result =  yield call(api.updateBodies, action.values.id, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.UPDATE_BODIES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('EditBodies', error));
    yield put(reset('EditBodies'));
}

// change status value
export function* toggleBodyStatusSaga() {
    yield takeLatest(types.REQUEST_BODIES_STATUS, callToggleBodyStatus);
}

function* callToggleBodyStatus(action) {
    let error = {};
    console.log('action', action)
    const result =  yield call(api.updateBodiesStatus, action.bodyId, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.BODIES_STATUS_SUCCESS, resp, message: result.statusText});
    }
}


// delete makes data from table
export function* deleteBodySaga() {
    yield takeLatest(types.REQUEST_BODIES_DELETE, callDeleteBody)
}

function* callDeleteBody(action) {
    const result = yield call(api.deleteBody, action.bodyId);

    if(result.errors) {
        yield put({ type: types.REQUEST_BODIES_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put(bodyAction.deleteBodiesSuccess(action.bodyId, result.statusText));
    }
} 

