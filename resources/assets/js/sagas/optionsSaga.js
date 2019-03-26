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
    const response = yield call(api.getOptions, action.pageNumber);
    const options = response.data
    
    if (response.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: response.error});
        error = response.error;
        notify.show("Cannot Get all Options!","error", 5000)
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
    if (result.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        notify.show("Cannot Add Options!", "error", 5000)
    } else {
        // yield put({type: types.ADD_OPTIONS_SUCCESS, resp, message: result.statusText});
        yield put({type: types.REQUEST_OPTIONS})
        notify.show("Options Added Successfully!", "success", 5000)
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
    const pageNumber = action.page
    if (result.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Update ${resp.option_desc}!`, "error", 5000)
    } else {
        // yield put({type: types.UPDATE_OPTIONS_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_OPTIONS, pageNumber})
        notify.show(`${resp.option_desc} Updated Successfully!`, "success", 5000)
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
    const pageNumber = action.page
    if (result.errors) {
        yield put({ type: types.REQUEST_OPTIONS_FAILED, errors: result.error});
        error = result.error;
        notify.show(`Cannot Change Status of ${resp.option_desc}`, "error", 5000)
    } else {
        // yield put({type: types.OPTIONS_STATUS_SUCCESS, resp, message: result.statusText});
        yield put ({type: types.REQUEST_OPTIONS, pageNumber})
        notify.show(`Status of ${resp.option_desc} Updated!`, "success", 5000)
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
        notify.show("Cannot Add Options", "error", 5000)
    } else {
        yield put(optionAction.deleteOptionsSuccess(action.optionId, result.statusText));
        notify.show("Options Deleted Successfully!", "error", 5000)
    }
} 