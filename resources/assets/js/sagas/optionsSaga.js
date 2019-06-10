import {takeLatest, call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as types from '../actions/action-types';
import * as api from '../api/options-api';
import * as optionAction from '../actions/options-actions'
import {notify} from 'react-notify-toast'

//Get Options data in table
export function* OptionWatcher() {
    yield takeLatest(types.REQUEST_OPTIONS, OptionSaga)
}
function* OptionSaga(action) {
    const response = yield call(api.getOptions, action.pageNumber, action.sorted_column, action.order);
    const options = response.data
    
    if (response.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot get all options!","error", 5000)
    } else {
        yield put({type: types.GET_OPTIONS_SUCCESS, options});
    }
}

// Submit form data of Options
export function* submitOptionsSaga() {
    yield takeLatest(types.REQUEST_OPTIONS_SUBMIT, callOptionSubmit)
}
function* callOptionSubmit(action) {
    yield put(startSubmit('PostOptions'));
    let error = {};
    const result =  yield call(api.addOptions, action.values);
    const resp = result.data
    const pageNumber= action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if ((result.errors && !resp.success)|| (result.errors || !resp.success)) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        if(resp.errorcode==23000) {
            notify.show("Option Description already exists!","error", 5000);
        }
        notify.show("Cannot create new Option!","error", 5000);
    } else {
        // yield put({type: types.ADD_OPTIONS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_OPTIONS, pageNumber, sorted_column, order})
        notify.show("Created successfully!", "success", 5000)
    }
    yield put(stopSubmit('PostOptions', error));
    yield put(reset('PostOptions'));
}

//edit form data of Options
export function* editOptionsSaga() {
    yield takeLatest(types.REQUEST_OPTIONS_UPDATE, callEditOption);
}

function* callEditOption (action) {
    yield put(startSubmit('EditOptions'));
    let error = {};
    const result =  yield call(api.updateOptions, action.values.id, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Update failed!","error", 5000);
    } else {
        // yield put({type: types.UPDATE_OPTIONS_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_OPTIONS, pageNumber, sorted_column, order})
        notify.show("Updated successfully!", "success", 5000)
    }
    yield put(stopSubmit('EditOptions', error));
    yield put(reset('EditOptions'));
}

// change status value
export function* toggleStatusSaga() {
    yield takeLatest(types.REQUEST_OPTIONS_STATUS, callOptToggleStatus);
}

function* callOptToggleStatus(action) {
    const result =  yield call(api.updateOptionsStatus, action.optionId, action.values);
    const resp = result.data;
    const pageNumber = action.pageNumber
    const sorted_column=action.sorted_column
    const order= action.order
    if (result.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot update status !","error", 5000);
    } else {
        // yield put({type: types.OPTIONS_STATUS_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_OPTIONS, pageNumber, sorted_column, order})
        notify.show("Status updated successfully!", "success", 5000)
    }
}

// delete Options data from table
export function* deleteOptionsSaga() {
    yield takeLatest(types.REQUEST_OPTIONS_DELETE, callDeleteOption)
}

function* callDeleteOption(action) {
    const result = yield call(api.deleteOptions, action.optionId);

    if(result.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Delete failed!", "error", 5000)
    } else {
        yield put(optionAction.deleteOptionsSuccess(action.optionId, result.statusText));
        notify.show("Deleted successfully!", "error", 5000)
    }
} 