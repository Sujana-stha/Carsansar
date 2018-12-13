import {takeLatest, call, put, fork, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'connected-react-router';
import * as types from '../actions/action-types';
import * as api from '../api/makes-api';
import * as makeAction from '../actions/makes-action'

//Get makes data in table
function* MakeWatcher() {
    yield takeLatest(types.REQUEST_MAKES, MakeSaga)
}
function* MakeSaga() {
    const response = yield call(api.getMakes);
    const makes = response.data
    console.log('make',makes);  

    yield put({type: types.GET_MAKES_SUCCESS, makes});
}

// Get Makes pagination in table
function* MakesPagesWatcher() {
    yield takeLatest(types.REQUEST_MAKES_PAGES, callMakesPages)
}
function* callMakesPages(action) {
    console.log('acti', action);
    const result =  yield call(api.getMakesPages, action.pageNumber);
    console.log('res', result);
    const resp = result.data
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.GET_MAKES_PAGES, resp});
    }
}


// Submit form data of makes
function* submitSaga() {
    yield takeLatest(types.REQUEST_SUBMIT, callSubmit)
}
function* callSubmit(action) {
    console.log('addd',action);
    yield put(startSubmit('PostMakes'));
    let error = {};
    const result =  yield call(api.addMakes, action.values);
    console.log('res',result);
    const resp = result.data
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_MAKES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('PostMakes', error));
    // yield put(push('/makes'));
}

//edit form data of makes
function* editSaga() {
    yield takeLatest(types.REQUEST_UPDATE, callEditMake);
}

function* callEditMake (action) {
    console.log('act', action)
    yield put(startSubmit('EditMakes'));
    let error = {};
    const result =  yield call(api.updateMake, action.makeId, action.values);
    console.log('res',result);
    const resp = result.data;
    if (result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.UPDATE_MAKES_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('EditMakes', error));
    yield put(push('/makes'));
}

// delete makes data from table
function* deleteSaga() {
    yield takeLatest(types.REQUEST_DELETE, callDeleteMake)
}

function* callDeleteMake(action) {
    console.log('act', action)
    const result = yield call(api.deleteMake, action.makeId);
    console.log('res',result);
    const resp =  result.data;
    const makeId = action.makeId
    if(result.errors) {
        yield put({ type: types.REQUEST_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put(makeAction.deleteMakesSuccess(action.makeId, result.statusText));
    }
} 
//root saga containing all sagas
export function* rootSaga() {
    yield  [
        fork(MakeWatcher),
        fork(submitSaga),
        fork(editSaga),
        fork(deleteSaga),
        fork(MakesPagesWatcher)
    ]
}
