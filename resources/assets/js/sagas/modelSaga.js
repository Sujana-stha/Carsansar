import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/model-api';
import * as modelAction from '../actions/model-action'


//Get makes data in table
export function* ModelWatcher() {
    yield takeLatest(types.REQUEST_MODEL, ModelSaga)
}
function* ModelSaga() {
    const response = yield call(api.getModel);
    const models = response.data
    yield put({type: types.GET_MODEL_SUCCESS, models});
}

// Get Makes pagination in table
export function* ModelPagesWatcher() {
    yield takeLatest(types.REQUEST_MODEL_PAGES, callModelPages)
}
function* callModelPages(action) {
    const result =  yield call(api.getModelPages, action.pageNumber);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.GET_MODEL_PAGES, resp});
    }
}


// Submit form data of makes
export function* submitModelSaga() {
    yield takeLatest(types.REQUEST_MODEL_SUBMIT, callModelSubmit)
}
function* callModelSubmit(action) {
    yield put(startSubmit('PostModels'));
    let error = {};
    const result =  yield call(api.addModel, action.values);
    const resp = result.data

    if (result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.error;
        console.log('err', error)
    } else {
        yield put({type: types.ADD_MODEL_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('PostModels', error));
}

//edit form data of makes
export function* editModelSaga() {
    yield takeLatest(types.REQUEST_UPDATE, callModelEdit);
}

function* callModelEdit (action) {
    yield put(startSubmit('EditModels'));
    let error = {};
    const result =  yield call(api.updateModel, action.values.id, action.values);
    const resp = result.data;

    if (result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put({type: types.UPDATE_MODEL_SUCCESS, resp, message: result.statusText});
    }
    yield put(stopSubmit('EditModels', error));
}

// delete makes data from table
export function* deleteModelSaga() {
    yield takeLatest(types.REQUEST_MODEL_DELETE, callDeleteModel)
}

function* callDeleteModel(action) {
    const result = yield call(api.deleteModel, action.modelId);

    if(result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.error;
    } else {
        yield put(modelAction.deleteModelSuccess(action.modelId, result.statusText));
    }
} 

// //root saga containing all sagas
// export function* rootSaga() {
//     yield  [
//         fork(MakeWatcher),
//         fork(submitSaga),
//         fork(editSaga),
//         fork(deleteSaga),
//         fork(MakesPagesWatcher)
//     ]
// }