import {takeLatest, call, put, fork, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'connected-react-router';
import * as types from '../actions/action-types';
import * as api from '../api/makes-api';


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

// Submit form data of makes
function* submitSaga() {
    yield takeEvery(types.REQUEST_SUBMIT, callSubmit)
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
        yield put({type: types.ADD_MAKES_SUCCESS, resp});
    }
    yield put(stopSubmit('PostMakes', error));
    yield put(push('/makes'));
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
        yield put({type: types.UPDATE_MAKES_SUCCESS, resp});
    }
    yield put(stopSubmit('EditMakes', error));
    yield put(push('/makes'));
}

//root saga containing all sagas
export function* rootSaga() {
    yield  [
        fork(MakeWatcher),
        fork(submitSaga),
        fork(editSaga)
    ]
}
