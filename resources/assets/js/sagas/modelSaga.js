import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/model-api';
import * as modelAction from '../actions/model-action'
import {notify} from 'react-notify-toast';

//Get models data in table
export function* ModelWatcher() {
    yield takeLatest(types.REQUEST_MODEL, ModelSaga)
}
function* ModelSaga(action) {
    const response = yield call(api.getModel, action.pageNumber, action.sorted_column, action.order);
    const models = response.data
    
    if (response.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all models!", "error", 5000)
    } else {
        yield put({type: types.GET_MODEL_SUCCESS, models});
    }
}

// Submit form data of models
export function* submitModelSaga() {
    yield takeLatest(types.REQUEST_MODEL_SUBMIT, callModelSubmit)
}
function* callModelSubmit(action) {
    yield put(startSubmit('PostModels'));
    let error ={}
    const result =  yield call(api.addModel, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.errors
        notify.show("Cannot creat new Model!", "error", 5000)
    } else if(!resp.success) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = resp.errormsg
        if(resp.errorcode==23000) {
            notify.show("Model Description already exists!","error", 5000);
        } else {
            notify.show("Cannot creat new Model!", "error", 5000)
        }
    } else {
        // yield put({type: types.ADD_MODEL_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_MODEL, pageNumber, sorted_column, order})
        notify.show("Created successfully!", "success", 5000)
    }
    yield put(stopSubmit('PostModels', error));
    yield put(reset('PostModels'));

}

//edit form data of models
export function* editModelSaga() {
    yield takeLatest(types.REQUEST_MODEL_UPDATE, callModelEdit);
}

function* callModelEdit (action) {
    yield put(startSubmit('EditModels'));
    let error = {};
    const result =  yield call(api.updateModel, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order=action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed!", "error", 5000)
    } else {
        // yield put({type: types.UPDATE_MODEL_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_MODEL, pageNumber, sorted_column, order});
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditModels', error));
    yield put(reset('EditModels'));
}

// change status value
export function* toggleModelsStatusSaga() {
    yield takeLatest(types.REQUEST_MODEL_STATUS, callModelToggleStatus);
}

function* callModelToggleStatus(action) {
    const result =  yield call(api.updateModel, action.modelId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column = action.sorted_column
    const order = action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_MODEL_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot update status !", "error", 5000)
    } else {
        // yield put({type: types.MODEL_STATUS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_MODEL, pageNumber, sorted_column, order});
        notify.show("Status updated successfully!", "success", 5000)
    }
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
        notify.show("Delete failed!", "error", 5000)
    } else {
        yield put(modelAction.deleteModelSuccess(action.modelId, result.statusText));
        notify.show("Deleted successfully!", "error",5000)
    }
} 
